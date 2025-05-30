const {test,expect}= require('@playwright/test')

test.only('UiBasicTest',async ({browser})=>{

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  console.log(await page.title())
  expect (page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
  let username= await page.locator('#username')
  await username.fill('rahulshetty')
  let password= await page.locator('#password')
  await password.fill('learning')
  let signinbtn=await page.locator('#signInBtn')
  await signinbtn.click()
 console.log(await page.locator('[style*="block"]').textContent())
//  await console.log(page.locator('[style*="block"]')).toContainText('Incorrect')
 
 await username.fill('')
 await username.fill('rahulshettyacademy')
 await signinbtn.click()
 console.log(await page.locator(".card-body a").nth(0).textContent())
 console.log(await page.locator(".card-body a").first().textContent())
 console.log(await page.locator(".card-body a").last().textContent())

 const allTitles=await page.locator(".card-body a").allTextContents()
 console.log(allTitles)

 

})

test('googleTest',async ({page})=>{

  await page.goto('https://google.com')
  console.log(await page.title())
  await expect (page).toHaveTitle("Google")

})