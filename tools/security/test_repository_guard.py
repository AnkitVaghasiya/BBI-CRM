"""Synthetic-only regression tests for the repository secret guard."""
import subprocess
import tempfile
import unittest
from pathlib import Path
from repository_guard import forbidden_name, scan_tracked


class RepositoryGuardTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        subprocess.run(["git", "init", "-q"], cwd=self.root, check=True)

    def add(self, name: str, content: bytes):
        path = self.root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(content)
        subprocess.run(["git", "add", "--", name], cwd=self.root, check=True)

    def test_rejects_private_key_filename_without_reading(self):
        self.add("config/ssl/server.key", b"not a real key")
        self.assertIn(("config/ssl/server.key", "sensitive filename/type"), scan_tracked(self.root))

    def test_rejects_env_files_and_sqlite(self):
        self.add(".env.production", b"PLACEHOLDER=1")
        self.add("data/app.sqlite3", b"SQLite format 3")
        self.assertEqual(2, len(scan_tracked(self.root)))

    def test_detects_private_key_marker_without_leaking_value(self):
        self.add("notes.txt", b"-----BEGIN " + b"PRIVATE KEY-----\nFAKE\n")
        self.assertEqual([("notes.txt", "private-key marker")], scan_tracked(self.root))

    def test_detects_aws_style_key_pattern(self):
        self.add("sample.txt", b"key='AKIA" + b"A" * 16 + b"'")
        self.assertEqual([("sample.txt", "AWS access-key pattern")], scan_tracked(self.root))

    def test_allows_examples_without_secrets(self):
        self.add(".env.example", b"API_KEY=YOUR_KEY_HERE\n")
        self.add("README.md", b"Never include tokens, passwords or private keys.")
        self.assertEqual([], scan_tracked(self.root))

    def test_ignores_untracked_files(self):
        (self.root / "local-secret.txt").write_text("-----BEGIN " + "PRIVATE KEY-----", encoding="utf-8")
        self.assertEqual([], scan_tracked(self.root))

    def test_binary_content_not_scanned_as_text(self):
        self.add("public/icon.png", b"\x89PNG\x00-----BEGIN " + b"PRIVATE KEY-----")
        self.assertEqual([], scan_tracked(self.root))

    def test_rejects_oversized_tracked_text(self):
        self.add("giant.txt", b"A" * 10_000_001)
        self.assertEqual([("giant.txt", "file too large for this scanner; review manually")], scan_tracked(self.root))

    def test_name_function_is_case_insensitive(self):
        self.assertTrue(forbidden_name(Path("settings/ID_ED25519")))
        self.assertFalse(forbidden_name(Path(".env.sample")))


if __name__ == "__main__":
    unittest.main()
