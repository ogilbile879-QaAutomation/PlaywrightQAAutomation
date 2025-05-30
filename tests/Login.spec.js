const{test,expect}=require('@playwright/test')

test('logintest',async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/')
    let email=await page.locator('#userEmail')
    let password=await page.locator('#userPassword')
    let login=page.locator('#login')
    await email.fill('mrproton@gmail.com')
    await password.fill('Testuser@123')
    await login.click()
    await console.log(await page.locator('div[aria-label="Incorrect email or password."]').textContent)
    // await page.locator('div[aria-label="Incorrect email or password."]').toContainText('Incorrect')


    await email.fill('')
    await email.fill('mrproton2004@gmail.com')
    await password.fill('Testuser@123')
    await login.click()

    await page.waitForLoadState('networkidle')

    console.log(await page.locator('.card-body b').nth(0).textContent())

    const alltext= await page.locator('.card-body b').allTextContents()
    console.log(alltext)




})
