
const { browser, driver, $ } = require('@wdio/globals');

class AppHelper {
    // Menunggu elemen sampai tampil
    async waitForElement(selector) {
        const element = await $(selector);

        await element.waitForDisplayed({
            timeout: 20000,
            timeoutMsg: `Element tidak ditemukan: ${selector}`
        });

        return element;
    }

    // Klik elemen
    async tap(selector) {
        const element = await this.waitForElement(selector);
        await element.click();
    }

    // Mengisi teks
    async enterText(selector, value) {
        const element = await this.waitForElement(selector);
        await element.setValue(value);
    }

    // Mengambil teks elemen
    async getText(selector) {
        const element = await this.waitForElement(selector);
        return await element.getText();
    }

    // Memastikan elemen tampil
    async isDisplayed(selector) {
        const element = await $(selector);
        return await element.isDisplayed();
    }

    // Menutup keyboard Android
    async hideKeyboard() {
        try {
            await driver.hideKeyboard();
        } catch (error) {
            console.log('Keyboard tidak perlu ditutup.');
        }
    }

    // Membuka ulang aplikasi
    async resetApp() {
        await driver.terminateApp('com.swaglabsmobileapp');
        await driver.activateApp('com.swaglabsmobileapp');

        // Pastikan halaman login sudah tampil
        await this.waitForElement('~test-Username');
    }
}

module.exports = new AppHelper();
