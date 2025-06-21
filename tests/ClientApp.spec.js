const {test, expect } = require("@playwright/test")

test('client APP', async ({page})=>{
await page.goto('https://rahulshettyacademy.com/client/')
    let email=await page.locator('#userEmail')
    let password=await page.locator('#userPassword')
    let login=page.locator('#login')

    const productName = 'ZARA COAT 3'
    const products =page.locator(".card")

    await email.fill('anshika@gmail.com')
    await password.fill('Iamking@000')
    await login.click()

    await page.waitForLoadState('networkidle')

    console.log(await page.locator('.card-body b').nth(0).textContent())

    const alltext= await page.locator('.card-body b').allTextContents()
    console.log(alltext)

    const count= await products.count()
    for(let i=0;i<count;i++)
    {
        if(await products.nth(i).locator("b").textContent() === productName)
        {
            await products.nth(i).locator("text= Add To Cart").click()
            break
        }
    }

    await page.locator("[routerlink*='cart']").click()
    await page.locator("div.cart li").first().waitFor()
    const bool=page.locator("//h3[text()='ZARA COAT 3']").isVisible()
    expect(bool).toBeTruthy()

    await page.locator("//button[text()='Checkout']").click()
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100})
    const options=page.locator("section.ta-results")
    await options.waitFor()

    const optioncount= await options.locator("button").count()

    for(let i=0;i<optioncount;i++){
        let text = await options.locator("button span").nth(i).textContent()
        if(text === " India"){
            await options.locator("button").nth(i).click()
            break
        }
    }

    expect(page.locator(".user__name label")).toHaveText("anshika@gmail.com")

    await page.locator(".action__submit").click()
    expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")

    const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    console.log(orderId)

    await page.locator("button[routerlink*='myorders']").click()
    await page.locator("tbody").waitFor()
    const rows=await page.locator("tbody tr")

    for (let i=0;i<await rows.count();++i){
        const roworderid=await rows.nth(i).locator("th").textContent()
        console.log(roworderid)
        if(orderId.includes(roworderid)){
            await rows.nth(i).locator("button").first().click()
            break
        }
    }
    const orderIdDetails=await page.locator("div .col-text").textContent()
    expect(orderId.includes(orderIdDetails)).toBeTruthy()

    page.pause()

    })