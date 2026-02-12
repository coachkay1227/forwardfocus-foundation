from playwright.sync_api import Page, expect, sync_playwright
import time

def test_ai_resource_discovery(page: Page):
    # 1. Arrange: Go to the homepage.
    page.goto("http://localhost:8080")

    # Wait for the page to load
    page.wait_for_load_state("networkidle")

    # 2. Act: Find the "Emergency chat" button and click it.
    chat_button = page.locator('button[aria-label="Emergency chat"]')
    expect(chat_button).to_be_visible()
    chat_button.click()

    # 3. Assert: Modal should open.
    # Use a more specific selector to avoid strict mode violation
    # The visible title inside the dialog header
    modal_title = page.locator('div[role="dialog"] h2').filter(has_text="AI Resource Discovery").last
    expect(modal_title).to_be_visible()

    # 4. Act: Send a message.
    input_box = page.locator('input[placeholder*="Ask me about resources"]')
    expect(input_box).to_be_visible()
    input_box.fill("I need help finding food")
    input_box.press("Enter")

    # 5. Wait for response.
    time.sleep(5)

    # 6. Screenshot: Capture the modal.
    page.screenshot(path="/home/jules/verification/ai_resource_discovery.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_ai_resource_discovery(page)
        finally:
            browser.close()
