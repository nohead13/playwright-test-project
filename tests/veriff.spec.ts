import { test, expect, chromium } from '@playwright/test';

test.describe('E2E with before each', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.saas-3.veriff.me/');
    await expect(page.locator('h3')).toHaveText('Welcome to our Veriff Demo');
  });

  test('Check default-generated user parameters and location region with inContext step', async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    const iframe = page.frameLocator('#veriffFrame');
    await expect(iframe.locator('h1')).toHaveText('Let\'s get you verified');
    await expect(iframe.locator('option[selected=""]')).toHaveText('Estonia (+372)');
  });

  test('Check of privacy policy link redirection', async ({ page }) => {
    await page.locator('text=Privacy Policy').click();
    //Checked opened modal window with cookies uses rights
    await page.locator('h1:has-text("Veriff.com uses cookies")');
    await page.locator('a[class^=sc-3930ee63-0]:has-text("Accept")').click;
    await page.waitForNavigation({ url: 'https://www.veriff.com/privacy-policy?navigation=slim' });
  });

  test('Check with filled user with redirect step with ID card', async ({page}) => {
    //Filled name as 'Will Ferrell'
    await page.locator('[name=name]').fill('Will Ferrell');
    //Select language
    await page.locator('button[role="button"]:has-text("Select a language")').click();
    await page.locator('li[role="option"]:has-text("Polski")').click();
    //Select document type
    await page.locator('button[role="button"]:has-text("Select a document")').click();
    await page.locator('li[role="option"]:has-text("ID Card")').click();
    //Checked redirect way next steps
    await page.check('[value=redirect]');
    await page.locator('text=Veriff Me').click();
    //Checked Title
    await expect(page.locator('h1')).toHaveText('Zacznijmy weryfikację'); //Polish "Let's get you verified"
    //Button Next is disabled
    await page.locator('[data-testid=phone-number-submit-button]').isDisabled;
  });

  test('Check with filled user with redirect step with Residence Permit', async ({page}) => {
    //Filled name as 'Will Ferrell'
    await page.locator('[name=name]').fill('Will Ferrell');
     //Select language
    await page.locator('button[role="button"]:has-text("Select a language")').click();
    await page.locator('li[role="option"]:has-text("Русский")').click();
    //Select document type
    await page.locator('button[role="button"]:has-text("Select a document")').click();
    await page.locator('li[role="option"]:has-text("Residence Permit")').click();
     //Checked redirect way next steps
    await page.check('[value=redirect]');
    await page.locator('text=Veriff Me').click();
    //Click on submit button 'Continue with your current device'
    await page.locator('button[class^="bxn0um8 "]').click;    
    //Checked Title
    await expect(page.locator('h1')).toHaveText('Начнем идентификацию'); //Russian "Let's get you verified"
  });

  test('Check with default-generated user with inContext step with Residence Permit with Document country=Azerbaijan filled', async ({page}) => {
    //Fill country
    await page.fill('[name=documentCountry]', 'Azerbaijan');
    //Select document type
    await page.locator('button[role="button"]:has-text("Select a document")').click();
    await page.locator('li[role="option"]:has-text("Residence Permit")').click();
    //Click submit
    await page.locator('button[type="submit"]').click();
    //Checked Title
    const iframe = page.frameLocator('#veriffFrame');
    await expect(iframe.locator('h1')).toHaveText('Let\'s get you verified');
});

  test('Check with default-generated user with inContext step with Residence Permit with Document country=Austria selected', async ({page}) => {
    //Fill country
    await page.locator('[name=documentCountry]:has-text("Select a language")');
    await page.locator('[data-testid="AT"]').click;
    //Select document type
    await page.locator('button[role="button"]:has-text("Select a document")').click();
    await page.locator('li[role="option"]:has-text("Residence Permit")').click();
    //Click submit
    await page.locator('button[type="submit"]').click();
    //Checked Title
    const iframe = page.frameLocator('#veriffFrame');
    await expect(iframe.locator('h1')).toHaveText('Let\'s get you verified');
  });

});

test('Check default-generated user parameters and fr-FR local with inContext step', async () => {
  //Change browser local
  const browser = await chromium.launch();
  const context = await browser.newContext({
    locale: 'fr-FR',
  });
  const page = await context.newPage();
  await page.goto('https://demo.saas-3.veriff.me/');
  await expect(page.locator('h3')).toHaveText('Welcome to our Veriff Demo');
  await page.locator('button[type="submit"]').click();
  const iframe = page.frameLocator('#veriffFrame');
  //Check translation on page
  await expect(iframe.locator('h1')).toHaveText('Vérifions votre identité');
  await expect(iframe.locator('option[selected=""]')).toHaveText('Estonie (+372)');
});