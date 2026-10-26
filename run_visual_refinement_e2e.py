import sys
import time
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://localhost:3000"
SCREENSHOT_DIR = "D:/Independant/qa_screenshots/visual_refinement"

ROUTES = [
    ('/', 'landing'),
    ('/explore', 'explore'),
    ('/compare', 'compare'),
    ('/budget', 'budget'),
    ('/calculator', 'calculator'),
    ('/labels', 'labels'),
    ('/kitchen', 'kitchen'),
    ('/recipes', 'recipes'),
    ('/learn', 'learn'),
    ('/library', 'library'),
    ('/basket', 'basket'),
]

VIEWPORTS = [
    (390, 844, 'mobile'),
    (768, 1024, 'tablet'),
    (1366, 768, 'laptop'),
    (1440, 900, 'desktop'),
]

def run_tests():
    print("==================================================")
    print("MACROSNAP VISUAL REFINEMENT & PAGE POLISH E2E")
    print("==================================================")

    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)

        # -------------------------------------------------------------
        # Journey A: Explore Page
        # -------------------------------------------------------------
        print("\n--- Running Journey A: Explore Page ---")
        context_a = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context_a.new_page()
        try:
            page.goto(f"{BASE_URL}/explore", wait_until="networkidle")
            time.sleep(1)

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

            # Check lower section existence
            has_lower = page.locator("text=Put Your Food Knowledge To Work").first.is_visible()
            assert has_lower, "Expected lower section on /explore"

            results.append(("Journey A: Explore Page", "PASSED"))
        except Exception as e:
            print(f"Journey A failed: {e}")
            results.append(("Journey A: Explore Page", f"FAILED: {e}"))
        finally:
            context_a.close()

        # -------------------------------------------------------------
        # Journey B: Compare Page
        # -------------------------------------------------------------
        print("\n--- Running Journey B: Compare Page ---")
        context_b = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context_b.new_page()
        try:
            page.goto(f"{BASE_URL}/compare?foodA=paneer-fresh&foodB=tofu-firm", wait_until="networkidle")
            time.sleep(1)

            page.wait_for_selector("#select-contender-a", timeout=5000)
            sel_a = page.locator("#select-contender-a").first.input_value()
            sel_b = page.locator("#select-contender-b").first.input_value()
            print(f"Contenders in showdown: sel_a={sel_a}, sel_b={sel_b}")
            assert sel_a == "paneer-fresh" and sel_b == "tofu-firm"

            # Save comparison (triggers non-blocking toast)
            save_btn = page.locator("button:has-text('Save Matchup')").first
            if save_btn.is_visible():
                save_btn.click()
                time.sleep(0.5)
                toast = page.locator("[role='status']").first
                assert toast.is_visible()

            # Check lower section existence
            has_lower = page.locator("text=Continue Your Analysis").first.is_visible()
            assert has_lower, "Expected lower section on /compare"

            results.append(("Journey B: Compare Page", "PASSED"))
        except Exception as e:
            print(f"Journey B failed: {e}")
            results.append(("Journey B: Compare Page", f"FAILED: {e}"))
        finally:
            context_b.close()

        # -------------------------------------------------------------
        # Journey C: Basket Page
        # -------------------------------------------------------------
        print("\n--- Running Journey C: Basket Page ---")
        context_c = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context_c.new_page()
        try:
            page.goto(f"{BASE_URL}/basket", wait_until="networkidle")
            time.sleep(1)

            starter_btn = page.locator("button:has-text('Load Starter Staples')").first
            if starter_btn.is_visible():
                starter_btn.click()
                time.sleep(0.5)

            items_count = page.locator("table tbody tr, ul li").count()
            print(f"Basket item count: {items_count}")
            assert items_count >= 1

            # Check lower section existence
            has_lower = page.locator("text=Next Steps With Your Protein Basket").first.is_visible()
            assert has_lower, "Expected lower section on /basket"

            results.append(("Journey C: Basket Page", "PASSED"))
        except Exception as e:
            print(f"Journey C failed: {e}")
            results.append(("Journey C: Basket Page", f"FAILED: {e}"))
        finally:
            context_c.close()

        # -------------------------------------------------------------
        # Journey D: Calculator Page
        # -------------------------------------------------------------
        print("\n--- Running Journey D: Calculator Page ---")
        context_d = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context_d.new_page()
        try:
            page.goto(f"{BASE_URL}/calculator", wait_until="networkidle")
            time.sleep(1)

            num_input = page.locator("#body-weight-number").first
            assert num_input.is_visible()
            num_input.fill("75")
            num_input.dispatch_event("change")
            time.sleep(0.5)

            slider = page.locator("#body-weight-slider").first
            assert slider.input_value() == "75"

            # Check lower section existence
            has_lower = page.locator("text=How to Distribute Your Daily Protein Target").first.is_visible()
            assert has_lower, "Expected lower section on /calculator"

            results.append(("Journey D: Calculator Page", "PASSED"))
        except Exception as e:
            print(f"Journey D failed: {e}")
            results.append(("Journey D: Calculator Page", f"FAILED: {e}"))
        finally:
            context_d.close()

        # -------------------------------------------------------------
        # Journey E: Recipes Page
        # -------------------------------------------------------------
        print("\n--- Running Journey E: Recipes Page ---")
        context_e = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context_e.new_page()
        try:
            page.goto(f"{BASE_URL}/recipes", wait_until="networkidle")
            time.sleep(1)

            # Check lower section existence
            has_lower = page.locator("text=Staples Powering These Recipes").first.is_visible()
            assert has_lower, "Expected lower section on /recipes"

            results.append(("Journey E: Recipes Page", "PASSED"))
        except Exception as e:
            print(f"Journey E failed: {e}")
            results.append(("Journey E: Recipes Page", f"FAILED: {e}"))
        finally:
            context_e.close()

        # -------------------------------------------------------------
        # Journey F: Library Page
        # -------------------------------------------------------------
        print("\n--- Running Journey F: Library Page ---")
        context_f = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context_f.new_page()
        try:
            page.goto(f"{BASE_URL}/library", wait_until="networkidle")
            time.sleep(1)

            # Check lower section existence
            has_lower = page.locator("text=Expand Your Personal Food Collection").first.is_visible()
            assert has_lower, "Expected lower section on /library"

            results.append(("Journey F: Library Page", "PASSED"))
        except Exception as e:
            print(f"Journey F failed: {e}")
            results.append(("Journey F: Library Page", f"FAILED: {e}"))
        finally:
            context_f.close()

        # -------------------------------------------------------------
        # Journey G: Mobile Responsiveness & Navbar Redesign
        # -------------------------------------------------------------
        print("\n--- Running Journey G: Mobile Responsiveness & Navbar ---")
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
                assert burger.is_visible()
                burger.click()
                time.sleep(0.5)

                # Check mobile menu links (Explore in mobile drawer)
                explore_link = page.locator("[data-testid='mobile-menu'] a:has-text('Explore')").first
                assert explore_link.is_visible(), "Explore link should be visible in expanded mobile menu"

                # Check top metadata strip is NOT in DOM
                assert page.locator("text=MACROSNAP VOL. 2026").count() == 0, "Top micro-bar must be removed!"
                assert page.locator("text=AUTONOMOUS FOOD BIOLOGY ATELIER").count() == 0, "Top micro-bar must be removed!"

                burger.click() # close
                time.sleep(0.5)

                results.append((f"Journey G: Mobile {width}x{height}", "PASSED"))
            except Exception as e:
                print(f"Journey G ({width}x{height}) failed: {e}")
                results.append((f"Journey G: Mobile {width}x{height}", f"FAILED: {e}"))
            finally:
                context_g.close()

        # -------------------------------------------------------------
        # Journey H: Camera HUD Removal & Reduced Motion
        # -------------------------------------------------------------
        print("\n--- Running Journey H: Camera HUD Removal & Motion Safety ---")
        context_h = browser.new_context(
            viewport={"width": 1440, "height": 900},
            reduced_motion="reduce"
        )
        page = context_h.new_page()
        try:
            page.goto(f"{BASE_URL}/", wait_until="networkidle")
            time.sleep(1)

            # Confirm camera overlay is completely gone
            assert page.locator("#cinematic-timecode").count() == 0, "Cinematic timecode must be gone!"
            assert page.locator("text=SPECTRAL RESOLUTION").count() == 0, "Camera spectral resolution must be gone!"
            assert page.locator("text=FOCUS-PLANE").count() == 0, "Focus plane must be gone!"
            assert page.locator("text=CINEMATIC ATELIER").count() == 0, "CINEMATIC ATELIER must be gone!"
            assert page.locator("text=ACT 01/07").count() == 0, "ScrubberRail must be gone!"

            # Check hero title is visible and bold
            hero_title = page.locator("h1").first
            assert hero_title.is_visible()

            results.append(("Journey H: Camera Removal & Motion", "PASSED"))
        except Exception as e:
            print(f"Journey H failed: {e}")
            results.append(("Journey H: Camera Removal & Motion", f"FAILED: {e}"))
        finally:
            context_h.close()

        # -------------------------------------------------------------
        # Multi-Device Screenshots: All Routes across 4 Viewports
        # -------------------------------------------------------------
        print("\n--- Capturing Comprehensive Screenshots across all routes & viewports ---")
        for width, height, vp_name in VIEWPORTS:
            ctx = browser.new_context(viewport={"width": width, "height": height})
            p_vp = ctx.new_page()
            for route, r_name in ROUTES:
                try:
                    p_vp.goto(f"{BASE_URL}{route}", wait_until="networkidle")
                    time.sleep(0.5)
                    shot_path = f"{SCREENSHOT_DIR}/{vp_name}_{width}x{height}_{r_name}.png"
                    p_vp.screenshot(path=shot_path, full_page=False)
                except Exception as ex:
                    print(f"Screenshot failed for {route} at {vp_name}: {ex}")
            ctx.close()

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
        print("\n>>> ALL VISUAL REFINEMENT E2E TESTS & SCREENSHOTS COMPLETED! <<<")
        sys.exit(0)
    else:
        print("\n>>> SOME TESTS FAILED. PLEASE REVIEW LOGS. <<<")
        sys.exit(1)

if __name__ == "__main__":
    run_tests()
