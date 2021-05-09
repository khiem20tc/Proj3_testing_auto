const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('https://www.vietnamworks.com/');

driver.findElement(By.name('keyword')).sendKeys('IT');
driver.findElement(By.className('button searchBar__button')).click();

driver.sleep(2000).then(function() {
    var isExistJob = {}
    driver.findElements(By.className('block-job-list')).then(elements => {
      console.log(elements.length)
      if(elements.length === 1) isExistJob = true
      else isExistJob = false
    })
    .then(
      ()=> {
        console.log(isExistJob)
        if (isExistJob === true) console.log("Passed")
        else console.log("Failed")
        driver.quit();
      }
    );
});

//Conclude a test
//driver.quit();
