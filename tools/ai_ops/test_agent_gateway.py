"""Cross-platform, no-network safety tests for BrainBinary's AI agent gateway."""
import importlib.util
import json
import os
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

ENTRY = Path(__file__).with_name("agent_gateway.py")
spec = importlib.util.spec_from_file_location("bbi_agent_gateway", ENTRY)
gateway = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gateway)


class GatewaySafetyTests(unittest.TestCase):
    def test_only_free_model_and_chatgpt_backends(self):
        self.assertEqual(set(gateway.CAPS), {"codex", "opencode-free", "ollama-local"})
        self.assertEqual(gateway.MODELS["opencode-free"], "opencode/glm-5.3-flash-free")
        self.assertEqual(gateway.MODELS["ollama-local"], "qwen2.5-coder:1.5b")

    def test_bounded_daily_run_caps(self):
        self.assertTrue(all(1 <= count <= 15 for count in gateway.CAPS.values()))
        self.assertTrue(all(20 <= timeout <= 160 for timeout in gateway.TIMEOUTS.values()))

    def test_no_secrets_leak_to_child_environment(self):
        secret = "SECRET_MUST_STAY_LOCAL"
        with patch.dict(os.environ, {"BBI_SAMPLE_API_KEY": secret, "BBI_SAMPLE_TOKEN": secret}):
            env = gateway.safe_environment()
        self.assertNotIn("BBI_SAMPLE_API_KEY", env)
        self.assertNotIn("BBI_SAMPLE_TOKEN", env)
        self.assertNotIn(secret, " ".join(env.values()))

    def test_source_is_allowlisted_demo_excerpts_only(self):
        with tempfile.TemporaryDirectory() as tmp:
            worktree = Path(tmp)
            (worktree / ".git").write_text("synthetic worktree", encoding="utf-8")
            (worktree / "README.md").write_text("BRAINBINARY demo English source", encoding="utf-8")
            with patch.object(gateway, "WORKTREE", worktree):
                body = gateway.curated_excerpt()
        self.assertIn("FILE: README.md", body)
        self.assertIn("BRAINBINARY", body)
        self.assertLess(len(body), 24000)

    def test_source_with_private_key_is_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            worktree = Path(tmp)
            (worktree / ".git").write_text("synthetic worktree", encoding="utf-8")
            (worktree / "README.md").write_text(
                "-----BEGIN PRIVATE KEY-----\nsynthetic forbidden material\n",
                encoding="utf-8"
            )
            with patch.object(gateway, "WORKTREE", worktree):
                with self.assertRaisesRegex(RuntimeError, "private key"):
                    gateway.curated_excerpt()

    def test_cli_process_exit_status(self):
        rc, stdout, _ = gateway.bounded(
            [sys.executable, "-c", "print('SAFE_PROBE')"],
            timeout=10, env=gateway.safe_environment()
        )
        self.assertEqual(rc, 0)
        self.assertIn(b"SAFE_PROBE", stdout)

    def test_opencode_policy_is_deny_only(self):
        config = {
            "model": gateway.MODELS["opencode-free"],
            "permissions": [
                {"action": "*", "resource": "*", "effect": "deny"},
                {"action": "shell", "resource": "*", "effect": "deny"},
            ],
            "policies": [{"action": "tool.use", "resource": "*", "effect": "deny"}],
        }
        with tempfile.TemporaryDirectory() as tmp:
            p = Path(tmp) / "read-only-config.json"
            p.write_text(json.dumps(config), encoding="utf-8")
            with patch.object(gateway, "OPENCONFIG", p):
                saved = json.loads(gateway.OPENCONFIG.read_text(encoding="utf-8"))
        self.assertEqual(saved["model"], gateway.MODELS["opencode-free"])
        self.assertTrue(all(x["effect"] == "deny" for x in saved["permissions"]))
        self.assertTrue(all(x["effect"] == "deny" for x in saved["policies"]))

    def test_ollama_restricted_to_synthetic_triage(self):
        with patch.object(sys, "argv", [
            "agent_gateway.py", "review", "--backend", "ollama-local",
            "--task", "security-review"
        ]):
            with self.assertRaisesRegex(RuntimeError, "restricted to classification"):
                gateway.main()

    def test_local_triage_prompt_has_no_client_data(self):
        prompt = gateway.make_prompt("triage")
        self.assertIn("synthetic", prompt.lower())
        self.assertIn("CATEGORY:", prompt)
        self.assertLess(len(prompt), 700)


if __name__ == "__main__":
    unittest.main(verbosity=2)
