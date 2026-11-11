
const { expect } = require('chai');
const { driver, $, $$ } = require('@wdio/globals');

const helper = require('../helpers/app_helper');
const users = require('../test_data/users');

describe('Advanced Mobile Testing - SauceDemo', function () {

    // Skenario 1: Launch aplikasi
    it('1. Should launch SauceDemo application', async function () {
        await helper.resetApp();

        const username = await helper.waitForElement('~test-Username');
        expect(await username.isDisplayed()).to.equal(true);
    });

    // Skenario 2: Login berhasil
    it('2. Should login successfully with valid credentials', async function () {
        await helper.resetApp();

        await helper.enterText('~test-Username', users.validUser.username);
        await helper.enterText('~test-Password', users.validUser.password);
        await helper.hideKeyboard();
        await helper.tap('~test-LOGIN');

        const products = await helper.waitForElement('~test-PRODUCTS');
        expect(await products.isDisplayed()).to.equal(true);
    });

    // Skenario 3: Login gagal
    it('3. Should show error for invalid username', async function () {
        await helper.resetApp();

        await helper.enterText('~test-Username', users.invalidUser.username);
        await helper.enterText('~test-Password', users.invalidUser.password);
        await helper.hideKeyboard();
        await helper.tap('~test-LOGIN');

        const errorMessage = await helper.waitForElement('~test-Error message');
        expect(await errorMessage.isDisplayed()).to.equal(true);
    });

    // Skenario 4: Sorting harga terendah
    it('4. Should sort products by price low to high', async function () {
        await helper.resetApp();

        await helper.enterText('~test-Username', users.validUser.username);
        await helper.enterText('~test-Password', users.validUser.password);
        await helper.hideKeyboard();
        await helper.tap('~test-LOGIN');

        await helper.waitForElement('~test-PRODUCTS');

        // Buka menu sorting
        await helper.tap('~test-Modal Selector Button');

        const sortOption = await $(
            'android=new UiSelector().text("Price (low to high)")'
        );

        await sortOption.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Pilihan Price (low to high) tidak ditemukan'
        });

        // Pilih opsi berdasarkan koordinat yang sudah diverifikasi
        await driver.execute('mobile: clickGesture', {
            x: 540,
            y: 1194
        });

        await driver.pause(2000);

        // Ambil seluruh elemen harga menggunakan UiAutomator
        const prices = await $$(
            'android=new UiSelector().description("test-Price")'
        );

        expect(prices.length).to.be.greaterThan(0);

        const firstPrice = await prices[0].getText();

        console.log('Harga produk pertama setelah sorting:', firstPrice);

        expect(firstPrice).to.equal('$7.99');
    });

    // Skenario 5: Logout
    it('5. Should logout successfully', async function () {
        await helper.resetApp();

        await helper.enterText('~test-Username', users.validUser.username);
        await helper.enterText('~test-Password', users.validUser.password);
        await helper.hideKeyboard();
        await helper.tap('~test-LOGIN');

        await helper.waitForElement('~test-PRODUCTS');

        await driver.execute('mobile: clickGesture', {
            x: 83,
            y: 213
        });

        await helper.tap('~test-LOGOUT');

        const username = await helper.waitForElement('~test-Username');
        expect(await username.isDisplayed()).to.equal(true);
    });

});
