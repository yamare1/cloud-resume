from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import random
import time

# Path to the ChromeDriver executable
chromedriver_path = '/Users/yonathanamare/Desktop/Capstone Project/chromedriver_mac64/chromedriver'
service = Service(executable_ptah=chromedriver_path)

# Set up Chrome options
chrome_options = webdriver.ChromeOptions()
#chrome_options.add_argument('--headless')  # To run Chrome in headless mode

# Initialize the Chrome WebDriver with options
driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    # Navigate to the login page
    driver.get('https://pdlogin.cardinalhealth.com/signin?TYPE=33554432&REALMOID=06-000b3ff8-f6e2-1c76-a58f-24d80a310000&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=mqfw03tvxPqy26CpvJlRXLvMutCBCiLDBsehyGRfHw0UTDxB7OJhfKqhTBY9nu1umX0rK79RYANFXWXZENACWPv6kX8m0p0p&TARGET=-SM-https%3a%2f%2forderexpress%2ecardinalhealth%2ecom%2feps%2fmycah')

    # Explicitly wait for the username element to be visible
    wait = WebDriverWait(driver, 10)
    username_element = wait.until(EC.visibility_of_element_located((By.ID, 'okta-signin-username')))
    username_element.send_keys('Capitol_Weho')  # Enter username

    # Locate and fill in the password
    password_element = driver.find_element(By.ID, 'okta-signin-password')
    password_element.send_keys('Raja8578!')  # Enter password

    # Locate and click the submit button
    submit_button = driver.find_element(By.ID, 'okta-signin-submit')
    submit_button.click()

    # Type into search bar and click search or press enter
    search_bar = driver.find_element(By.ID, 'viewns_Z7_23F6KHG30GG980IKD2NS6Q00C6_:searchbarSubview:searchbarForm:endeca_search_box_input')
    search_bar.click()
    # Optionally wait for some condition after login
    # Here you can wait for a specific element that appears only after login
    # Example: wait.until(EC.visibility_of_element_located((By.ID, 'someElement')))

    # Debug: Print the title of the page after login
    print("Page title after login:", driver.title)

    # Insert your actions here (data extraction, further navigation, etc.)

    # Random sleep to mimic human behavior (not recommended for final scripts)
    time.sleep(random.randint(2, 5))

    # Keep the browser open until you manually close it or the script ends
    input("Press Enter to close...")  # Wait for user input to close

finally:
    # Close the browser window
    driver.quit()
