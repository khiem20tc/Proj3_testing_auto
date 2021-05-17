const delay = require('delay')
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
const testcase = require('./input.js')
let fs = require('fs');


// console.log(testcase)
delay(1000)

if(fs.existsSync('./result.txt')){
    fs.unlinkSync('./result.txt')
}

async function runtest(testcase) {
const driver = await new webdriver.Builder()
    .forBrowser('chrome')
    .build();

await driver.get('https://www.vietnamworks.com/cong-ty');

//// chose category
const formGroup = await driver.findElements(By.className('form-group col-sm-4'))
// console.log(formGroup)
const selectCategory = await (await formGroup[0].findElement(By.id('select2-category-select-container'))).click()
const dropDown1 = await driver.findElements(By.className('select2-dropdown select2-dropdown--below'))
const inputCategorySearch = await await(dropDown1[0].findElement(By.className('select2-search__field'))).sendKeys(testcase.category)
const selectCategoryResult = await dropDown1[0].findElements(By.className('select2-results__option'))
const categoryItem = await selectCategoryResult[0].getText()
console.log( "category name" ,categoryItem)
await  await (formGroup[0].findElement(By.id('category-select'))).sendKeys(categoryItem)

// await delay(100)
// await (await formGroup[0].findElement(By.id('category-select'))).sendKeys(categoryItem)

// chose location
const selectLocation = await (await formGroup[1].findElement(By.id('select2-location-select-container'))).click();
const dropDown2 = await driver.findElements(By.className('select2-dropdown select2-dropdown--below'))
const inputLocationSearch = await (await dropDown2[0].findElement(By.className('select2-search__field'))).sendKeys(testcase.location)
const selectLocationResult = await dropDown2[0].findElements(By.className('select2-results__option'))
const LocationItem = await selectLocationResult[0].getText()
console.log(LocationItem)
await formGroup[1].findElement(By.id('location-select')).sendKeys(LocationItem)

//chose name company
// await formGroup[0].submit().then(err=>{
//     if (err)
//     throw(err)
// })
// await formGroup[1].submit().then(err => {
//     if (err) throw(err)
// })
const fillCompany = await driver.findElement(By.id('company-name-search'))
await fillCompany.sendKeys(testcase.companyName == '' ? ' ' : testcase.companyName);
if (testcase.companyName =='')
 await fillCompany.clear()

// await (await driver.findElement(By.id('companyList'))).click()
await delay(2000)
await (await driver.findElement(By.id('btn-filter-company'))).click()

console.log(testcase.onRecruit)
if (testcase.onRecruit == true){
    // console.log('21312')
    try{
        await (await driver.findElement(By.className('checkbox'))).click()

    }catch(err){

    }
}

// await delay(4000)
try {
    const wrapper = await driver.findElement(By.id("wrapper"))
    const companyList = await wrapper.findElement(By.id("companyList"));
    // console.log("company" , await companyList.getText())
    const isResult = await companyList.findElement(By.className("company-list__no-result"))
    // console.log(isResult);
    const h2 = await isResult.findElement(By.className("lead"));
    const textResult = await h2.getText();
    await driver.quit();
    console.log(textResult);
    
    return "nonResult";

    // console.log(await h2.getText());
} catch (error) {
    // console.log(error)
    // return false
}

const elements = await driver.findElements(By.className('company-profile-slider'))
const itemList = await elements[0].findElements(By.className("company-profile-item"))

let i = 0;
var listResultString = [];
for(i = 0; i < itemList.length ; i++){
    // listResultString.push(await itemList[i].getText())
   var openJob
    try{
        openJob = await (await itemList[i].findElement(By.className('opening-job'))).getText()
    }catch(err){
        openJob = ""
    }
    const dotdot = await itemList[i].findElements(By.className('dotdotdot'))
    var name = await dotdot[0].getText();
    var category = await dotdot[1].getText()
    var location = await dotdot[2].getText()

    // console.log(openJob , location , category , name)
    // console.log(item)
   

    var object = {
            onRecruit:  openJob == "ĐANG TUYỂN" ? true : false,
            companyName : name.toLowerCase(),
            category: category == "" ?  "" : category.toLowerCase(),
            location: location == "" ? "" : location.toLowerCase(),
    }
    listResultString.push(object);
  
}

// console.log(listResultString)

await driver.quit();
return  listResultString

}

async function selectTest(testcase , testName) {
    var result = "";
    var i = 0;
    for (i ; i < testcase.length ; i++)
    {
        var testResult = await runtest(testcase[i].in)

        if (testResult == "nonResult" )
        {
            if (testcase[i].out.nonResult == true)
                result += testName + i + ": Passed\n";
            else 
            {
                result += testName + i + ": Failed\n";
            }
            continue;
        } 
        var j = 0;
        var validate = true;

        for(j ; j < testResult.length; j++){
            var isName = testcase[i].out.companyName == "" ? -2 : testResult[j].companyName.indexOf(testcase[i].out.companyName.toLowerCase())
            var isLocation = testcase[i].out.location == "" ? -2 : testResult[j].location.indexOf(testcase[i].out.location.toLowerCase())
            var isCategory = testcase[i].out.category == "" ? -2 : testResult[j].category.indexOf(testcase[i].out.category.toLowerCase());
            var isOnRecruit = testcase[i].out.onRecruit == "" ? true : testResult[j].onRecruit == testcase[i].out.onRecruit;

            if (isName == -1 || isCategory == -1 || isLocation == -1 || isOnRecruit == false){
                console.log( isName , isLocation , isCategory , isOnRecruit)
                console.log(testcase[i].out.companyName , testcase[i].out.location.toLowerCase())
                result += testName + i + ": Failed\n";
                validate = false;
                break

            }
        }
        if (validate == true) 
            result += testName + i + ": Passed\n";
    }
    fs.appendFileSync("./result.txt" ,  result , function(err){
            if (err) {
                console.log(err)
                return
            }
            console.log("Test done")
    })

}

async function main(){
    await selectTest(testcase.TC_001 , "TC_001_")
    await selectTest(testcase.TC_002 , "TC_002_")
    await selectTest(testcase.TC_003 , "TC_003_")
    await selectTest(testcase.TC_004 , "TC_004_")
    await selectTest(testcase.TC_005 , "TC_005_")
    await selectTest(testcase.TC_006 , "TC_006_")




}

main()