import { test, expect } from '@playwright/test';


test('Request check 200', async ({ request, browser }) => {
   const _request = await request.post('https://demo.saas-3.veriff.me/', { 
     data : {
       "full_name": "Donny Christie", 
       "additionalData":{"isTest":false}
      }
    });
  
    expect(_request.status()).toBe(200);
    expect(_request.ok()).toBeTruthy();
});

//test('Response check should be "production"', async ({ request }) => {
//  const _response = await request.get('https://demo.saas-3.veriff.me/environment');
//  expect(await _response.json()).toContain(expect.objectContaining({
//    "env":"production"
//  }));  
//});