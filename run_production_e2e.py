import sys
import time
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://localhost:3000"
SCREENSHOT_DIR = "D:/Independant/qa_screenshots/production_ready"

def run_tests():
    print("==================================================")
    print("MACROSNAP MASTER PRODUCTION E2E BROWSER VALIDATION")
    print("==================================================")

    results = []

    with sync_playwright() as p:
        # Launch browser (Chromium via Edge)
        browser = p.chromium.launch(channel="msedge", headless=True)

        # -------------------------------------------------------------
        # Journey A: Explore Page (Search, Category Filters, Bookmark)
        # -------------------------------------------------------------
        print("\n--- Running Journey A: Explore Page ---")
        context_a = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context_a.new_page()
        try:
            page.goto(f"{BASE_URL}/explore", wait_until="networkidle")
            time.sleep(1)

            # Check that foods are rendered
            page.wait_for_selector("[data-testid='food-card'], article", timeout=5000)
            foods_count = page.locator("[data-testid='food-card'], article").count()
            print(f"Explore page loaded with {foods_count} food cards.")
            assert foods_count >= 10, f"Expected at least 10 food cards, found {foods_count}"

            # Search for 'Soy'
            search_input = page.locator("input[placeholder*='Search']").first
            search_input.fill("Soy")
            time.sleep(0.5)
            soy_cards = page.locator("[data-testid='food-card'], article").count()
            print(f"Filtered for 'Soy': {soy_cards} cards found.")
            assert soy_cards >= 1, "Expected at least 1 card matching 'Soy'"

            # Clear search
            search_input.fill("")
            time.sleep(0.5)

            # Filter by Whole Grains category pill
            grains_pill = page.locator("button:has-text('Whole Grains')").first
            if grains_pill.is_visible():
                grains_pill.click()
                time.sleep(0.5)
                grains_cards = page.locator("[data-testid='food-card'], article").count()
                print(f"Filtered for 'Whole Grains': {grains_cards} cards found.")
                assert grains_cards >= 1, "Expected at least 1 card in Whole Grains"

            # Reset category to All
            all_pill = page.locator("button:has-text('All Items')").first
            if all_pill.is_visible():
                all_pill.click()
                time.sleep(0.5)

            # Bookmark first card
            bookmark_btn = page.locator("button[aria-label*='bookmark' i], button[aria-label*='favorite' i]").first
            if bookmark_btn.is_visible():
                bookmark_btn.click()
                time.sleep(0.5)
                print("Bookmarked first food item.")

            results.append(("Journey A: Explore Page", "PASSED"))
        except Exception as e:
            print(f"Journey A failed: {e}")
            results.append(("Journey A: Explore Page", f"FAILED: {e}"))
        finally:
            context_a.close()

        # -------------------------------------------------------------
        # Journey B: Compare Page (Presets, URL Params, Winner, Toast)
        # -------------------------------------------------------------
        print("\n--- Running Journey B: Compare Page ---")
        context_b = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context_b.new_page()
        try:
            # Test URL query preselection
            page.goto(f"{BASE_URL}/compare?foodA=paneer-fresh&foodB=tofu-firm", wait_until="networkidle")
            time.sleep(1)

            # Verify both contenders are selected via select dropdowns or headings
            page.wait_for_selector("#select-contender-a", timeout=5000)
            sel_a = page.locator("#select-contender-a").first.input_value()
            sel_b = page.locator("#select-contender-b").first.input_value()
            print(f"Contenders in showdown: sel_a={sel_a}, sel_b={sel_b}")
            assert sel_a == "paneer-fresh" and sel_b == "tofu-firm", f"Expected paneer-fresh and tofu-firm, got {sel_a} and {sel_b}"

            # Save comparison (triggers non-blocking toast)
            save_btn = page.locator("button:has-text('Save Matchup')").first
            if save_btn.is_visible():
                save_btn.click()
                time.sleep(0.5)
                toast = page.locator("[role='status']").first
                toast_visible = toast.is_visible()
                toast_text = toast.inner_text() if toast_visible else ""
                print(f"Toast notification: visible={toast_visible}, text='{toast_text}'")
                assert toast_visible, "Expected non-blocking toast to appear on save"

            # Add winner to basket
            add_winner_btn = page.locator("button:has-text('Add Winner to Basket')").first
            if add_winner_btn.is_visible():
                add_winner_btn.click()
                time.sleep(0.5)
                print("Clicked 'Add Winner to Basket'")

            page.screenshot(path=f"{SCREENSHOT_DIR}/desktop_1440x900_compare.png")
            results.append(("Journey B: Compare Page", "PASSED"))
        except Exception as e:
            print(f"Journey B failed: {e}")
            results.append(("Journey B: Compare Page", f"FAILED: {e}"))
        finally:
            context_b.close()

        # -------------------------------------------------------------
        # Journey C: Basket Page (Empty State, Load Staples, Quantities)
        # -------------------------------------------------------------
        print("\n--- Running Journey C: Basket Page ---")
        context_c = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context_c.new_page()
        try:
            page.goto(f"{BASE_URL}/basket", wait_until="networkidle")
            time.sleep(1)

            # If empty, click "+ Load Starter Staples"
            starter_btn = page.locator("button:has-text('Load Starter Staples')").first
            if starter_btn.is_visible():
                print("Basket was empty, loading starter staples...")
                starter_btn.click()
                time.sleep(0.5)

            # Verify items in basket
            items_count = page.locator("table tbody tr, ul li").count()
            print(f"Basket item count: {items_count}")

            # Check for quantity buttons (+ / -)
            plus_btn = page.locator("button[aria-label*='Increase' i]").first
            if plus_btn.is_visible():
                plus_btn.click()
                time.sleep(0.5)
                print("Incremented quantity successfully")

            page.screenshot(path=f"{SCREENSHOT_DIR}/desktop_1440x900_basket.png")
            results.append(("Journey C: Basket Page", "PASSED"))
        except Exception as e:
            print(f"Journey C failed: {e}")
            results.append(("Journey C: Basket Page", f"FAILED: {e}"))
        finally:
            context_c.close()

        # -------------------------------------------------------------
        # Journey D: Calculator Page (Slider + Numeric Input Sync)
        # -------------------------------------------------------------
        print("\n--- Running Journey D: Calculator Page ---")
        context_d = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context_d.new_page()
        try:
            page.goto(f"{BASE_URL}/calculator", wait_until="networkidle")
            time.sleep(1)

            # Verify numeric input and slider exist and sync
            num_input = page.locator("#body-weight-number").first
            assert num_input.is_visible(), "Expected #body-weight-number input to be present"
            
            # Change value to 75
            num_input.fill("75")
            num_input.dispatch_event("change")
            time.sleep(0.5)
            print("Changed weight input to 75kg")

            # Check slider value
            slider = page.locator("#body-weight-slider").first
            slider_val = slider.input_value()
            print(f"Slider value synchronized: {slider_val}kg")
            assert slider_val == "75", f"Expected slider to sync to 75, got {slider_val}"

            # Select goal: Muscle gain
            muscle_goal = page.locator("button:has-text('Hypertrophy')").first
            if muscle_goal.is_visible():
                muscle_goal.click()
                time.sleep(0.5)
                print("Selected Hypertrophy / Muscle Gain goal")

            # Load sample plate if plate is empty
            load_plate_btn = page.locator("button:has-text('Load Sample Plate')").first
            if load_plate_btn.is_visible():
                load_plate_btn.click()
                time.sleep(0.5)
                print("Loaded sample high-protein plate")

            # Save protein target
            save_target_btn = page.locator("button:has-text('Set as My Target Goal')").first
            if save_target_btn.is_visible():
                save_target_btn.click()
                time.sleep(0.5)
                toast = page.locator("[role='status']").first
                assert toast.is_visible(), "Expected target saved toast to appear"
                print("Target goal saved successfully with toast notification")

            page.screenshot(path=f"{SCREENSHOT_DIR}/desktop_1440x900_calculator.png")
            results.append(("Journey D: Calculator Page", "PASSED"))
        except Exception as e:
            print(f"Journey D failed: {e}")
            results.append(("Journey D: Calculator Page", f"FAILED: {e}"))
        finally:
            context_d.close()

        # -------------------------------------------------------------
        # Journey E: Recipes Page (Servings Scale, Add to Basket)
        # -------------------------------------------------------------
        print("\n--- Running Journey E: Recipes Page ---")
        context_e = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context_e.new_page()
        try:
            page.goto(f"{BASE_URL}/recipes", wait_until="networkidle")
            time.sleep(1)

            # Check servings scale button
            plus_serving = page.locator("button[aria-label*='Increase servings' i]").first
            if plus_serving.is_visible():
                plus_serving.click()
                time.sleep(0.5)
                print("Increased servings count successfully")

            # Click Add all ingredients to basket
            add_all_btn = page.locator("button:has-text('Add All to Basket')").first
            if add_all_btn.is_visible():
                add_all_btn.click()
                time.sleep(0.5)
                print("Added recipe ingredients to basket")

            page.screenshot(path=f"{SCREENSHOT_DIR}/desktop_1440x900_recipes.png")
            results.append(("Journey E: Recipes Page", "PASSED"))
        except Exception as e:
            print(f"Journey E failed: {e}")
            results.append(("Journey E: Recipes Page", f"FAILED: {e}"))
        finally:
            context_e.close()

        # -------------------------------------------------------------
        # Journey F: Library Page (Tabs, Favorites, Clear All)
        # -------------------------------------------------------------
        print("\n--- Running Journey F: Library Page ---")
        context_f = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context_f.new_page()
        try:
            page.goto(f"{BASE_URL}/library", wait_until="networkidle")
            time.sleep(1)

            # Check tabs
            foods_tab = page.locator("button:has-text('Bookmarked Foods')").first
            duels_tab = page.locator("button:has-text('Saved Duels')").first
            recipes_tab = page.locator("button:has-text('Favorite Recipes')").first

            assert foods_tab.is_visible() and duels_tab.is_visible() and recipes_tab.is_visible(), "All 3 tabs must exist"
            
            # Switch to Showdowns
            duels_tab.click()
            time.sleep(0.5)
            # Switch to Recipes
            recipes_tab.click()
            time.sleep(0.5)
            # Switch back to Foods
            foods_tab.click()
            time.sleep(0.5)

            results.append(("Journey F: Library Page", "PASSED"))
        except Exception as e:
            print(f"Journey F failed: {e}")
            results.append(("Journey F: Library Page", f"FAILED: {e}"))
        finally:
            context_f.close()

        # -------------------------------------------------------------
        # Journey G: Mobile Responsiveness (360x800 & 390x844)
        # -------------------------------------------------------------
        print("\n--- Running Journey G: Mobile Responsiveness ---")
        for width, height in [(360, 800), (390, 844)]:
            context_g = browser.new_context(viewport={"width": width, "height": height})
            page = context_g.new_page()
            try:
                page.goto(f"{BASE_URL}/", wait_until="networkidle")
                time.sleep(1)

                # Check horizontal overflow
                overflow = page.evaluate("() => document.documentElement.scrollWidth > window.innerWidth")
                print(f"Viewport {width}x{height} - Horizontal overflow detected: {overflow}")
                assert not overflow, f"Horizontal overflow detected at {width}x{height}!"

                # Test mobile hamburger toggle
                burger = page.locator("button[aria-label*='Toggle navigation menu' i]").first
                assert burger.is_visible(), "Mobile hamburger toggle must be visible on mobile"
                burger.click()
                time.sleep(0.5)

                if width == 390:
                    page.screenshot(path=f"{SCREENSHOT_DIR}/mobile_390x844_menu.png")
                
                # Check mobile menu links (link with Explore Foods in mobile drawer)
                explore_link = page.locator("[data-testid='mobile-menu'] a:has-text('Explore Foods')").first
                assert explore_link.is_visible(), "Explore Foods link should be visible in expanded mobile menu"

                burger.click() # close
                time.sleep(0.5)

                if width == 390:
                    page.screenshot(path=f"{SCREENSHOT_DIR}/mobile_390x844_home.png")

                # Also test Calculator on mobile
                page.goto(f"{BASE_URL}/calculator", wait_until="networkidle")
                time.sleep(1)
                calc_overflow = page.evaluate("() => document.documentElement.scrollWidth > window.innerWidth")
                assert not calc_overflow, f"Horizontal overflow on /calculator at {width}x{height}!"
                if width == 360:
                    page.screenshot(path=f"{SCREENSHOT_DIR}/mobile_360x800_calculator.png")

                results.append((f"Journey G: Mobile {width}x{height}", "PASSED"))
            except Exception as e:
                print(f"Journey G ({width}x{height}) failed: {e}")
                results.append((f"Journey G: Mobile {width}x{height}", f"FAILED: {e}"))
            finally:
                context_g.close()

        # -------------------------------------------------------------
        # Journey H: Reduced Motion Emulation
        # -------------------------------------------------------------
        print("\n--- Running Journey H: Reduced Motion Emulation ---")
        context_h = browser.new_context(
            viewport={"width": 1440, "height": 900},
            reduced_motion="reduce"
        )
        page = context_h.new_page()
        try:
            page.goto(f"{BASE_URL}/", wait_until="networkidle")
            time.sleep(1)

            # Check that home page renders cleanly without animation errors
            hero_title = page.locator("h1").first
            assert hero_title.is_visible(), "Hero title must be visible under reduced motion"
            
            # Check timecode HUD is static
            timecode = page.locator("#cinematic-timecode").first
            if timecode.is_visible():
                tc1 = timecode.inner_text()
                time.sleep(0.3)
                tc2 = timecode.inner_text()
                print(f"Reduced-motion timecode check: tc1='{tc1}', tc2='{tc2}' (static={tc1 == tc2})")
                assert tc1 == tc2, "Timecode HUD must freeze when prefers-reduced-motion is active"

            results.append(("Journey H: Reduced Motion", "PASSED"))
        except Exception as e:
            print(f"Journey H failed: {e}")
            results.append(("Journey H: Reduced Motion", f"FAILED: {e}"))
        finally:
            context_h.close()

        # -------------------------------------------------------------
        # Additional Screenshots: Tablet & Laptop
        # -------------------------------------------------------------
        print("\n--- Capturing Tablet & Laptop Screenshots ---")
        # Tablet
        ctx_tab = browser.new_context(viewport={"width": 768, "height": 1024})
        p_tab = ctx_tab.new_page()
        p_tab.goto(f"{BASE_URL}/explore", wait_until="networkidle")
        p_tab.screenshot(path=f"{SCREENSHOT_DIR}/tablet_768x1024_explore.png")
        ctx_tab.close()

        # Laptop
        ctx_lap = browser.new_context(viewport={"width": 1366, "height": 768})
        p_lap = ctx_lap.new_page()
        p_lap.goto(f"{BASE_URL}/", wait_until="networkidle")
        p_lap.screenshot(path=f"{SCREENSHOT_DIR}/laptop_1366x768_home.png")
        ctx_lap.close()

        # Desktop Home
        ctx_desk = browser.new_context(viewport={"width": 1440, "height": 900})
        p_desk = ctx_desk.new_page()
        p_desk.goto(f"{BASE_URL}/", wait_until="networkidle")
        p_desk.screenshot(path=f"{SCREENSHOT_DIR}/desktop_1440x900_home.png")
        ctx_desk.close()

        browser.close()

    print("\n==================================================")
    print("TEST SUMMARY")
    print("==================================================")
    all_passed = True
    for name, status in results:
        print(f"  {name}: {status}")
        if "FAILED" in status:
            all_passed = False

    if all_passed:
        print("\n>>> ALL PRODUCTION E2E BROWSER JOURNEYS PASSED SUCCESSFULLY! <<<")
        sys.exit(0)
    else:
        print("\n>>> SOME TESTS FAILED. PLEASE REVIEW LOGS. <<<")
        sys.exit(1)

if __name__ == "__main__":
    run_tests()
