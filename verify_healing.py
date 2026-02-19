from playwright.sync_api import sync_playwright

def verify_healing_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            print("Verifying /victim-services...")
            page.goto("http://localhost:8080/victim-services", wait_until="networkidle")

            # Check for main sections
            if page.locator("text=The Healing Hub & Sanctuary").is_visible():
                print("PASS: Hero section loaded.")
            else:
                print("FAIL: Hero section not found.")

            if page.locator("text=Digital Healing Sanctuary").is_visible():
                print("PASS: Daily Healing Toolkit loaded.")
            else:
                print("FAIL: Daily Healing Toolkit not found.")

            # Check for the new button
            search_button = page.get_by_role("button", name="Search Local Ohio Resources")
            if search_button.is_visible():
                print("PASS: 'Search Local Ohio Resources' button found.")
                search_button.click()

                # Check modal title
                # The screenshot shows "AI Resource Discovery" as the title
                page.wait_for_selector("text=AI Resource Discovery", timeout=5000)
                if page.locator("text=AI Resource Discovery").first.is_visible():
                    print("PASS: AI Resource Discovery modal opened.")
                else:
                    print("FAIL: Resource Discovery modal did not open or title mismatch.")
            else:
                print("FAIL: 'Search Local Ohio Resources' button NOT found.")

            # Check for refactored Support Paths
            if page.locator("text=Crisis Intervention").is_visible():
                print("PASS: Support Paths section loaded.")

            # Check consistent styling (visual check via screenshot)
            page.screenshot(path="/home/jules/verification/healing_page_refactor_fixed.png")
            print("Screenshot saved.")

        except Exception as e:
            print(f"ERROR: {e}")
            page.screenshot(path="/home/jules/verification/healing_error_2.png")

        browser.close()

if __name__ == "__main__":
    verify_healing_page()
