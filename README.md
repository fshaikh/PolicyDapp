# PolicyDapp

## Requirments
Weather based insurance prototype needs to be created. The main idea is following.
I need to indemnify for rain in a certain day and place. As a user I have to visit a web page, type name, city, email and day and pay insurance fixed cost (0.01 Ether). Then an email is sent to previously specified email address confirming policy purchase (the email should contain a link to transaction in blockchain).
 If the rain happens in specified day (e.g. you can emulate data collection from weather.com) the user will receive 0.1 Ether insurance benefit and confirmation with a link to transaction.
 
## Use Cases:
1. As a user , i should be able to visit web page and see the UI - DONE
2. As a user, i should be able purchase policy - DONE
3. As a user, i should be able to see email with link to transaction in blockchain - DONE
4. As a user, i should be able to open the link and see transaction detail
5. As a user, i should be able to see my policies
6. As a user, i should be able to get ether insurance benefit if rain occurs on the day and place
7. As a user, i should be able to get confirmation email with link to transaction
8. As a user, i should be able to open the link and see transaction detail

## Basic Design
![Design](https://github.com/fshaikh/PolicyDapp/blob/master/Basic%20Design.JPG)

## Software Used
* Solidity
* web3.js
* Truffle
* JavaScript
* Node
* SendGrid API
* Visual Studio Code
* Ganache
* MetaMask
* Oraclize
