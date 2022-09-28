import pyautogui
import numpy as np
import cv2

import time, webbrowser, pyautogui

def make_screen_shot(name):
    image = pyautogui.screenshot(region = (0, 0, 1920, 1080))
    image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    cv2.imwrite(name, image)

def open_shoot_close(url, screen_name):
    webbrowser.open_new_tab(url)
    time.sleep(2)
    make_screen_shot(screen_name)
    pyautogui.hotkey('ctrl', 'w')


def start_make_screens_by_list(links_list):

    folder = 'C:/Users/G.Tishchenko/Desktop/web_screens/'

    for link in links_list:
        screen_name = folder + link[0] + '.jpg'
        open_shoot_close(link[1], screen_name)
