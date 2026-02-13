from playwright.sync_api import Page, expect, sync_playwright

def test_header_navigation(page: Page):
    # 1. Arrange: Go to the homepage.
    print("Navigating to homepage...")
    page.goto("http://localhost:8080/")

    # 2. Assert: Check for "Youth Futures" link in the header.
    print("Checking for Youth Futures link...")
    # We want to make sure it's a top-level item.
    # Since there might be multiple (desktop and mobile hidden), we should be careful.
    # But get_by_role("link", name="Youth Futures") should find at least one visible one on desktop.
    youth_link = page.get_by_role("link", name="Youth Futures").first

    # Expect it to be visible.
    expect(youth_link).to_be_visible()

    # Take a screenshot of the header
    page.screenshot(path="/home/jules/verification/header_verification.png")

    # 3. Act: Click it.
    print("Clicking link...")
    youth_link.click()

    # 4. Assert: Check URL.
    print("Verifying URL...")
    # Wait for navigation
    page.wait_for_url("**/youth-futures")
    expect(page).to_have_url("http://localhost:8080/youth-futures")

    # Take another screenshot of the destination page
    page.screenshot(path="/home/jules/verification/youth_futures_page.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Set viewport to desktop size to ensure desktop menu is visible
        page = browser.new_page(viewport={"width": 1280, "height": 720})
        try:
            test_header_navigation(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="/home/jules/verification/failure.png")
        finally:
            browser.close()
