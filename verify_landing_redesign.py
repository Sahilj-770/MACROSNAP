import os
import time
from playwright.sync_api import sync_playwright

SCREENSHOT_DIR = "D:/Independant/qa_screenshots/landing_redesign"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

def verify_landing():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        
        # 1. Desktop Test (1440x900)
        print("Testing Desktop 1440x900...")
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()
        page.goto("http://localhost:3000/", wait_until="networkidle")
        time.sleep(1)

        # Check essential elements
        hero = page.locator("#hero")
        assert hero.is_visible(), "Hero section should be visible"
        
        preview = page.locator("text=MacroSnap Food Engine")
        assert preview.is_visible(), "Product Preview should be visible"

        how_it_works = page.locator("#how-it-works")
        assert how_it_works.is_visible(), "How It Works section should be visible"

        features = page.locator("#features")
        assert features.is_visible(), "Core Features section should be visible"

        showcase = page.locator("#showcase")
        assert showcase.is_visible(), "Product Showcase section should be visible"

        # Test tab switching in Showcase
        print("Testing Showcase Tab switching...")
        shake_tab = page.locator("button:has-text('Roasted Chana vs RTD Shake')")
        assert shake_tab.is_visible(), "Showcase tab 2 should be visible"
        shake_tab.click()
        time.sleep(0.5)
        assert page.locator("text=Ready-to-Drink Protein Shake").is_visible(), "Tab 2 content should be visible"

        final_cta = page.locator("#final-cta")
        assert final_cta.is_visible(), "Final CTA section should be visible"

        # Check horizontal overflow on desktop
        overflow = page.evaluate("() => document.documentElement.scrollWidth > window.innerWidth")
        assert not overflow, "Desktop horizontal overflow detected!"

        page.screenshot(path=f"{SCREENSHOT_DIR}/landing_desktop_1440.png", full_page=True)
        print("Desktop screenshot saved.")
        context.close()

        # 2. Tablet Test (768x1024)
        print("Testing Tablet 768x1024...")
        context = browser.new_context(viewport={"width": 768, "height": 1024})
        page = context.new_page()
        page.goto("http://localhost:3000/", wait_until="networkidle")
        time.sleep(1)

        overflow = page.evaluate("() => document.documentElement.scrollWidth > window.innerWidth")
        assert not overflow, "Tablet horizontal overflow detected!"
        page.screenshot(path=f"{SCREENSHOT_DIR}/landing_tablet_768.png", full_page=True)
        print("Tablet screenshot saved.")
        context.close()

        # 3. Mobile Test (390x844)
        print("Testing Mobile 390x844...")
        context = browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()
        page.goto("http://localhost:3000/", wait_until="networkidle")
        time.sleep(1)

        overflow = page.evaluate("() => document.documentElement.scrollWidth > window.innerWidth")
        assert not overflow, "Mobile horizontal overflow detected!"

        # Test mobile burger menu
        burger = page.locator("button[aria-label*='Toggle navigation menu' i]").first
        assert burger.is_visible(), "Mobile burger menu button should be visible"
        burger.click()
        time.sleep(0.4)
        assert page.locator("[data-testid='mobile-menu']").is_visible(), "Mobile menu drawer should open"
        
        page.screenshot(path=f"{SCREENSHOT_DIR}/landing_mobile_menu_open.png")
        burger.click()
        time.sleep(0.4)

        page.screenshot(path=f"{SCREENSHOT_DIR}/landing_mobile_390.png", full_page=True)
        print("Mobile screenshot saved.")
        context.close()

        browser.close()
        print("\nALL LANDING PAGE VERIFICATION CHECKS PASSED!")

if __name__ == "__main__":
    verify_landing()
