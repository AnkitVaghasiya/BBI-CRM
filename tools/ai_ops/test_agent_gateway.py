"""No-provider-call safety tests for the BrainBinary AI agent gateway."""
import importlib.util
import os
from pathlib import Path
import sys
import unittest

p=Path(__file__).with_name("agent_gateway.py")
spec=importlib.util.spec_from_file_location("bbi_gateway",p)
gateway=importlib.util.module_from_spec(spec)
spec.loader.exec_module(gateway)

class GatewayTests(unittest.TestCase):
    def test_only_explicit_free_remote_model_is_selected(self):
        model=gateway.MODELS["opencode-free"]
        self.assertTrue(model.startswith("opencode/"))
        self.assertTrue(model.endswith("-free"))
        self.assertEqual(gateway.MODELS["ollama-local"],"qwen2.5-coder:1.5b")

    def test_no_paid_backend_is_available(self):
        self.assertEqual(set(gateway.CAPS),{"codex","opencode-free","ollama-local"})

    def test_cost_limits_are_positive_and_small(self):
        self.assertTrue(all(0<n<=15 for n in gateway.CAPS.values()))
        self.assertTrue(all(30<t<=160 for t in gateway.TIMEOUTS.values()))

    def test_secrets_removed_from_child_environment(self):
        marker="VERY_PRIVATE_TEST_VALUE"
        original=os.environ.get("BRAINBINARY_FAKE_API_KEY")
        try:
            os.environ["BRAINBINARY_FAKE_API_KEY"]=marker
            environ=gateway.safe_environment()
            self.assertNotIn("BRAINBINARY_FAKE_API_KEY",environ)
            self.assertNotIn(marker," ".join(environ.values()))
        finally:
            if original is None:os.environ.pop("BRAINBINARY_FAKE_API_KEY",None)
            else:os.environ["BRAINBINARY_FAKE_API_KEY"]=original

    def test_snippets_restricted_to_explicit_public_demo_sources(self):
        self.assertTrue(all(".." not in item for item in gateway.SOURCES))
        content=gateway.curated_excerpt()
        self.assertIn("BRAINBINARY",content.upper())
        self.assertLess(len(content),24000)
        self.assertNotIn("PRIVATE KEY-----",content)

    def test_run_process_reports_actual_exit_status(self):
        rc,out,_=gateway.bounded([sys.executable,"-c","print('ok')"],timeout=10,env=gateway.safe_environment())
        self.assertEqual(rc,0)
        self.assertIn(b"ok",out)

    def test_local_model_is_documented_as_triage_only(self):
        import inspect
        self.assertIn("ollama-local",gateway.CAPS)
        self.assertIn("triage",gateway.TASKS)
        self.assertIn("Small offline model restricted to classification",inspect.getsource(gateway.main))

    def test_safe_opencode_permissions_are_all_denies(self):
        import json
        cfg=json.loads(gateway.OPENCONFIG.read_text(encoding="utf-8"))
        self.assertEqual(cfg["model"],gateway.MODELS["opencode-free"])
        self.assertTrue(cfg["permissions"])
        self.assertTrue(all(rule["effect"]=="deny" for rule in cfg["permissions"]))
        self.assertTrue(all(rule["effect"]=="deny" for rule in cfg["policies"]))

if __name__=="__main__":
    unittest.main(verbosity=2)
