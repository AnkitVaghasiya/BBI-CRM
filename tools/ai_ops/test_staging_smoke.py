"""No-network regression tests for the HTTPS staging boundary smoke."""
import unittest

from check_mcp_auth_public import PROTECTED, PUBLIC, validate_base, verify


def transport(public_status=200, private_status=401, headers=None):
    response_headers = headers if headers is not None else {
        "Strict-Transport-Security": "max-age=31536000",
        "Content-Security-Policy": "default-src 'self'",
    }

    def fetch(method, path, body):
        if path in {p for _, p, _ in PUBLIC}:
            return public_status, response_headers
        if path in {p for _, p, _ in PROTECTED}:
            return private_status, {}
        raise AssertionError(f"Unexpected path {path}")

    return fetch


class StagingSmokeTests(unittest.TestCase):
    def test_accepts_https_origin(self):
        self.assertEqual(validate_base("https://example.test/"), "https://example.test")

    def test_rejects_http_and_userinfo(self):
        for value in ("http://example.test", "https://admin:password@example.test",
                      "https://example.test/api", "https://example.test?access_token=fake",
                      "https://example.test#fragment"):
            with self.subTest(value=value):
                with self.assertRaises(ValueError):
                    validate_base(value)

    def test_all_boundaries_pass_expected_responses(self):
        lines, errors = verify(transport())
        self.assertFalse(errors)
        self.assertEqual(len(PUBLIC) + len(PROTECTED), len(lines))

    def test_rejects_unprotected_api(self):
        _, errors = verify(transport(private_status=200))
        self.assertEqual(len(PROTECTED), len(errors))

    def test_rejects_auth_redirect_not_just_success(self):
        _, errors = verify(transport(private_status=302))
        self.assertEqual(len(PROTECTED), len(errors))

    def test_rejects_missing_hsts(self):
        _, errors = verify(transport(headers={"Content-Security-Policy": "default-src 'self'"}))
        self.assertEqual(len(PUBLIC), len(errors))

    def test_rejects_missing_csp(self):
        _, errors = verify(transport(headers={"Strict-Transport-Security": "max-age=31536000"}))
        self.assertEqual(len(PUBLIC), len(errors))

    def test_rejects_unhealthy_public_service(self):
        _, errors = verify(transport(public_status=503))
        self.assertEqual(len(PUBLIC), len(errors))

    def test_network_errors_fail_closed(self):
        def failure(method, path, body):
            raise TimeoutError("Synthetic test failure - should not print URL or credentials")

        lines, errors = verify(failure)
        self.assertEqual(len(PUBLIC) + len(PROTECTED), len(errors))
        self.assertTrue(all("REQUEST_ERROR" in line for line in lines))

    def test_no_real_data_in_synthetic_mcp_request(self):
        rpc = PROTECTED[-1][2].decode("utf-8")
        self.assertIn('"method": "ping"', rpc)
        self.assertNotIn("token", rpc.lower())
        self.assertNotIn("password", rpc.lower())


if __name__ == "__main__":
    unittest.main()
