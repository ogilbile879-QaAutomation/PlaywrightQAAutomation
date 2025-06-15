const{test,expect}=require('@playwright/test')

test('child window handle',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    const blinktext=page.locator("[href*='documents-request']")

    const [newPage]=await Promise.all([
    context.waitForEvent('page'),
    blinktext.click(),
    ])
    const text=await newPage.locator('.red').first().textContent();
    const arraytxt=text.split("@")
    const domain= arraytxt[1].split(" ")[0]
    console.log(domain.trim('.com'))

    await page.locator("#username").fill(domain)
    await page.pause()
    console.log(await page.locator("#username").textContent())
})