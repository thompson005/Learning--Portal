# Business Logic Vulnerabilities Lab Walkthrough

_Category: Hacking Practical — Source: https://www.canva.com/design/DAGdqf0IKd4/wA9C6ROzrqep8dHAJMYY6w/edit_

---

## Slide 1

BUSINESS LOGIC
VULNERABILITIES LAB
WALKTHROUGH

Business Logic Vulnerabilities Lab Walkthrough

## Slide 2

9.9s
Animate
Position

BUSINESS LOGIC VULNERABILITIES
LAB WALKTHROUGH

This lab demonstrates how to exploit a
business logic vulnerability in a web
application using Burp Suite. The objective is
to manipulate the price of an item in the
shopping cart to complete a purchase
despite insufficient store credit.

Business Logic Vulnerabilities Lab Walkthrough

This lab demonstrates how to exploit a business logic vulnerability in a web application using Burp Suite. The objective is to manipulate the price of an item in the shopping cart to complete a purchase despite insufficient store credit.

## Slide 3

6.7s
Animate
Position

WALKTHROUGH

Open Burp Suite and ensure that the proxy is set up correctly.




Navigate to the web application and log in with your credentials.

STEP 1: LOG IN TO THE APPLICATION

Walkthrough

Step 1: Log in to the Application

Open Burp Suite and ensure that the proxy is set up correctly.

Navigate to the web application and log in with your credentials.

## Slide 4

5.0s
Animate
Position

Log in screen

STEP 1: LOG IN TO THE APPLICATION

Step 1: Log in to the Application

Log in screen

## Slide 5

5.7s
Animate
Position

STEP 2: ATTEMPT TO BUY THE LEATHER JACKET

Find the leather jacket in the application and attempt to add it to
your cart.

When you try to complete the order, it will be rejected due to
insufficient store credit.

Step 2: Attempt to Buy the Leather Jacket

Find the leather jacket in the application and attempt to add it to your cart.

When you try to complete the order, it will be rejected due to insufficient store credit.

## Slide 6

5.0s
Animate
Position

STEP 2: ATTEMPT TO BUY THE LEATHER JACKET

Not enough store credit for this purchase

Order rejection message

Step 2: Attempt to Buy the Leather Jacket

Not enough store credit for this purchase

Order rejection message

## Slide 7

7.6s
Animate
Position

STEP 3: ANALYZE THE ORDER PROCESS IN BURP SUITE

In Burp Suite, go to Proxy > HTTP history.

Locate the request that corresponds to adding the leather jacket to your cart. This request should contain a price parameter.

Step 3: Analyze the Order Process in Burp Suite

In Burp Suite, go to Proxy > HTTP history.

Locate the request that corresponds to adding the leather jacket to your cart. This request should contain a price parameter.

## Slide 8

5.0s
Animate
Position

STEP 3: ANALYZE THE ORDER PROCESS IN BURP SUITE

HTTP history showing the add-to-cart request

Step 3: Analyze the Order Process in Burp Suite

HTTP history showing the add-to-cart request

## Slide 9

5.2s
Animate
Position

Right-click on the relevant request and select Send to Repeater.

Navigate to the Repeater tab in Burp Suite.

STEP 4: SEND REQUEST TO BURP REPEATER

Send to Repeater

Repeater

Step 4: send Request to Burp Repeater

Right-click on the relevant request and select Send to Repeater.

Navigate to the Repeater tab in Burp Suite.

Send to Repeater

Repeater

## Slide 10

5.0s
Animate
Position

STEP 4: SEND REQUEST TO BURP REPEATER

Modified price parameter in Repeater

Step 4: send Request to Burp Repeater

Modified price parameter in Repeater

## Slide 11

5.0s
Animate
Position

In the Repeater tab, locate the price parameter in the
request body.

Change the price value to an arbitrary integer

 (e.g., set it lower than your available store credit).

STEP 5: MODIFY THE PRICE PARAMETER

Step 5: Modify the Price Parameter

In the Repeater tab, locate the price parameter in the request body.

Change the price value to an arbitrary integer

(e.g., set it lower than your available store credit).

## Slide 12

5.0s
Animate
Position

STEP 5: MODIFY THE PRICE PARAMETER

Modified price parameter in Repeater

Step 5: Modify the Price Parameter

Modified price parameter in Repeater

## Slide 13

7.1s
Animate
Position

STEP 6: SEND THE MODIFIED REQUEST

Send to Repeater

Click on Send in Repeater.

Observe the response from the server.

Step 6: Send the Modified Request

Click on Send in Repeater.

Observe the response from the server.

Send to Repeater

## Slide 14

5.0s
Animate
Position

STEP 7: REFRESH YOUR CART

Go back to your browser and refresh your cart page.

Confirm that the price has changed based on your input.

Step 7: Refresh Your Cart

Go back to your browser and refresh your cart page.

Confirm that the price has changed based on your input.

## Slide 15

5.0s
Animate
Position

STEP 7: REFRESH YOUR CART

Updated cart with modified price

Step 7: Refresh Your Cart

Updated cart with modified price

## Slide 16

5.4s
Animate
Position

Proceed to checkout and complete your order with the
modified price.

Confirm that you successfully placed an order for the
leather jacket.

STEP 8: COMPLETE YOUR ORDER

Step 8: Complete Your Order

Proceed to checkout and complete your order with the modified price.

Confirm that you successfully placed an order for the leather jacket.

## Slide 17

5.0s
Animate
Position

STEP 8: COMPLETE YOUR ORDER

Order confirmation message

Step 8: Complete Your Order

Order confirmation message

## Slide 18

6.8s
Animate
Position

In this lab, you successfully exploited a business logic vulnerability by manipulating a price parameter using Burp Suite. This exercise highlights how improper validation of user inputs can lead to significant security risks within web applications.

CONCLUSION

Conclusion

In this lab, you successfully exploited a business logic vulnerability by manipulating a price parameter using Burp Suite. This exercise highlights how improper validation of user inputs can lead to significant security risks within web applications.
