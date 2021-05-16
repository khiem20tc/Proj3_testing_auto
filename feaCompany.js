const delay = require('delay')
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
const testcase = require('./input.js')
let fs = require('fs');
const { time } = require('console');
const { del } = require('selenium-webdriver/http');

// console.log(testcase)
delay(1000)

async function runtest(testcase) {
const driver = await new webdriver.Builder()
    .forBrowser('chrome')
    .build();

await driver.get('https://www.vietnamworks.com/cong-ty');
// console.log(testcase)
// await driver.findElement(By.id('company-name-search')).sendKeys(testcase.companyName);
// await driver.findElement(By.className('btn btn-default btn-primary')).click();
// const present = await driver.findElements(By.className('select2-selection__arrow'));
// // console.log(present)
// await present[0].click();
// var inputSearch2 = await driver.findElements(By.className('select2-search__field'))
// delay(1000)
// await inputSearch2[0].sendKeys(testcase.category);
// var categorySearchList = driver.findElement(By.id("select2-category-select-results"))

// var resultCa = await categorySearchList.findElements(By.className("select2-results__option"))
// // await resultCa[0].click()
// var temp = await resultCa[0].getText()

// await driver.findElement(By.id('category-select')).sendKeys(temp)
// console.log(1)
// // await driver.findElement(By.id('location-select')).sendKeys(2)
// await present[1].click();
// console.log(2)
// var inputSearchLocation = await driver.findElements(By.className('select2-search__field'))
// // await driver.sleep(10000);
// // await delay(10000)

// console.log(inputSearchLocation)

// await inputSearchLocation[0].sendKeys(testcase.location);

// var LocationSearchList = await driver.findElement(By.id('select2-location-select-results'))
// var resultLo = await LocationSearchList.findElements(By.className("select2-results__option"))
// temp = await resultLo[0].getText()
// console.log(resultLo)
// await driver.findElement(By.id('location-select')).sendKeys(temp)


//// chose category
const formGroup = await driver.findElements(By.className('form-group col-sm-4'))
// console.log(formGroup)
const selectCategory = await formGroup[0].findElement(By.id('select2-category-select-container')).click()
const dropDown1 = await driver.findElements(By.className('select2-dropdown select2-dropdown--below'))
const inputCategorySearch = await dropDown1[0].findElement(By.className('select2-search__field')).sendKeys(testcase.category)
const selectCategoryResult = await dropDown1[0].findElements(By.className('select2-results__option'))
const categoryItem = await selectCategoryResult[0].getText()
console.log( "category name" ,categoryItem)
await formGroup[0].findElement(By.id('category-select')).sendKeys(categoryItem)

await delay(100)
// await (await formGroup[0].findElement(By.id('category-select'))).sendKeys(categoryItem)

// chose location
const selectLocation = await formGroup[1].findElement(By.id('select2-location-select-container')).click();
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
await delay(4000)
await (await driver.findElement(By.id('btn-filter-company'))).click()

console.log(testcase.onRecruit)
if (testcase.onRecruit == true){
    console.log('21312')
    await (await driver.findElement(By.className('checkbox'))).click()
}

let isExistJob
await delay(4000)
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
    var item = await itemList[i].getText();
    // console.log(item)
    item = item.split("\n");
    if (item.length == 4){
        var object = {
            onRecruit:  false,
            companyName : item[1].toLowerCase(),
            category: item[2] == undefined ?  "" : item[2].toLowerCase(),
            location: item[3] == undefined ? "" : item[3].toLowerCase(),
        }
        listResultString.push(object);
    } else {
        // console.log(item)
         var object = {
            onRecruit:  true,
            companyName : item[1].toLowerCase(),
            category:  item[2] == undefined ?  "" :item[2].toLowerCase(),
            location: item[3] == undefined ? "" : item[3].toLowerCase(),
        }
        listResultString.push(object);
    }
}

// console.log(listResultString)

await driver.quit();
return  listResultString

}

async function main(testcase , testName) {
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
                result += testName + i + ": Failed\n";
                validate = false;
                break

            }
        }
        if (validate == true) 
            result += testName + i + ": Passed\n";
    }
    fs.writeFileSync("./result.txt" ,  result , function(err){
            if (err) {
                console.log(err)
                return
            }
            console.log("Test done")
    })

}

main(testcase.TC_001 , "TC_001_")