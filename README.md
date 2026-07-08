# OWA Purge Deleted Items Automation

This repository provides a JavaScript solution to automatically select and bypass the lack of a "Select All" button in the "Recover Deleted Items" / "Purge" menu of Outlook Web App (OWA) - specifically tested on Exchange Server On-Premises environments.

## The Problem
In enterprise environments, automation/robot accounts receive thousands of automated alerts daily. When cleaning up these mailboxes via OWA, emptying the "Deleted Items" folder moves messages to a hidden area called "Recoverable Items". This hidden area keeps consuming the user quota until items are explicitly **Purged**.

However, Microsoft OWA does not provide a "Select All" button in the Recover/Purge pop-up menu. For 5,000+ automated emails, clicking them one by one manually is nearly impossible.

Moreover, standard `querySelectorAll().click()` scripts fail due to two core UI optimizations used by OWA:
1. **Virtual Scrolling (DOM Virtualization):** Only 10-15 visible emails exist in the DOM at any given time.
2. **Hover-to-Render Checkboxes:** Event listeners for the checkboxes are only attached when a physical mouse hovers over the row (`mouseover`/`mouseenter`).

## The Solution
This script automates the process directly via the browser's developer console by:
* Simulating virtual mouse movements (hovers) to force OWA to render and activate the checkbox element.
* Clicking elements one by one with safe delays to avoid freezing the tab.
* Forcefully scrolling the `scrollContainer` frame page by page to trigger lazy loading until the end of the list.

## How to Use
1. Open your Outlook Web App (OWA) in your browser.
2. Go to **Deleted Items** -> click **Recover deleted items** to open the purge menu.
3. Open your browser's Developer Tools by pressing **F12** and switch to the **Console** tab.
4. If your browser blocks pasting code, type `allow pasting` into the console first and hit Enter.
5. Copy the code from `script.js` in this repository, paste it into the console, and hit **Enter**.
6. Watch the list automatically scroll and select every item. Once it says `🎉 Done!`, you can safely click the **Purge** button on the top menu to clear the mailbox quota completely.

## Compatibility
* **Fully Compatible:** Exchange Server On-Premises (tested on `sver 15.2.x`).
* **Cloud OWA (Microsoft 365):** The underlying scroll and hover logic applies, but you might need to adjust the CSS class selectors (`._f_U1` and `.scrollContainer`) to match the Fluent UI architecture.

## License
MIT
