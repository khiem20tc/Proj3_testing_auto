const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('https://secure.vietnamworks.com/login/en?client_id=3&utm_source=&utm_medium=Header');

driver.findElement(By.name('username')).sendKeys('nhap_email');
driver.findElement(By.name('password')).sendKeys('nhap_pwd');
driver.findElement(By.id('button-login')).click();

driver.sleep(2000).then(function() {
    driver.getTitle().then(function(title) {
      if(title === 'Tuyển dụng, việc làm, tìm việc làm nhanh mới nhất | VietnamWorks') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
      driver.quit();
    });
  });

// Conclude a test
//driver.quit();