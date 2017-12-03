# NOTE: selenium needs to be installed and geckodriver must be added to /usr/bin
import sys
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

driver = 0

def TestVideo():
    try:
        WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.ID, "vid"))) # waits 3 seconds for an video to appear
        print "Passed video test"
    except TimeoutException:
        print "Failed video test"
        exit(0)

if __name__ == "__main__":
    url = ""
    email = ""
    password = ""

    if (len(sys.argv) == 4): #we only want a url, email, and password
            url = sys.argv[1]
            email = sys.argv[2]
            password = sys.argv[3]

            # creating a firefox profile with media preferences enabled
            fp = webdriver.FirefoxProfile()
            fp.set_preference('media.navigator.permission.disabled', True)
            fp.update_preferences()

            # create a new Firefox session
            driver = webdriver.Firefox(firefox_profile=fp)
            driver.implicitly_wait(15)
            driver.maximize_window()

            # navigate to the application home page
            driver.get(url)
    else:
        print "Incorrect command line arguments, please enter a url, email, and password"
        exit(0);

    signInTab = driver.find_element_by_xpath("//button[@class='tablinks'][1]")
    signInTab.click()

    emailTextBox = driver.find_element_by_xpath("//input[@id='email']")
    emailTextBox.send_keys(email)

    passwordTextBox = driver.find_element_by_xpath("//input[@id='password']")
    passwordTextBox.send_keys(password)

    time.sleep(2) # 2 second delay to make sure all text was inputted

    signInButton = driver.find_element_by_xpath("//button[@id='quickstart-sign-in']")
    signInButton.click()

    # checking if the sign-in worked
    try:
        WebDriverWait(driver, 3).until(EC.alert_is_present()) # waits 3 seconds for an alert to appear

        alert = driver.switch_to.alert
        alert.accept()
        print "Failed sign-in test"
        exit(0)
    except TimeoutException:
        print "Passed sign-in test"

    # refresh the page and check if the user is still signed in
    driver.get(url)

    time.sleep(2) # 2 second delay to let the page reload

    signInStatus = driver.find_element_by_xpath("//div[@id='quickstart-sign-in-status']")
    if email in signInStatus.text:
        print "Passed refresh test"
    else:
        print "Failed refresh test"
        exit(0)


    # changing to the camera tab
    cameraTab = driver.find_element_by_xpath("//button[@class='tablinks'][2]") # camera tab
    cameraTab.click()

    # checking the video/image capturing
    # first checking that the vid element works
    container1 = driver.find_element_by_xpath("//div[@id='container1']")
    container1.click()

    TestVideo()

    time.sleep(2) # 2 second delay to let the camera start up

    vidElement = driver.find_element_by_xpath("//video[@id='vid']")
    vidElement.click()

    # checking if the image was taken
    try:
        WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.ID, "img1"))) # waits 3 seconds for an img to appear
        print "Passed image capture test"
    except TimeoutException:
        print "Failed image capture test"
        exit(0)

    exit(0)
