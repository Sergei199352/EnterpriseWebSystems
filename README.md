# EnterpriseWebSystems
The website must have the functionality to display one single raffle:
    • Have a user interface that will allow members of the public to enter contact details to be entered into a raffle as a guest without an account (also include some unpublished detail that will tie guest users to their entry). DONE
    • Display some details about a single raffle prize and draw date (this can be static text or image). DONE
The website should have the functionality to extend the single raffle:
    • Allow all users to access their own user accounts (sign up and login). DONE
    • Allow raffle holders to add details of new raffle prizes. This should use a database. The active raffle prizes should be displayed on the website. DONE
    • Have functionality where a single “winner” is drawn at random and displayed on the website. This functionality could be triggered by a raffle holder via a user interface or API call.
The website could have the functionality to run more than one raffle:
    • Allow ordinary users to remove themselves from a raffle.
    • Allow ordinary users to enter a particular raffle multiple times (with their chances of winning suitably increased).
    • Alert winners to their unclaimed winnings when they log in.
    • Run multiple raffles with multiple raffle holders and with different draw times.
    • Allow ordinary users to select “lucky numbers” (i.e. a lottery option rather than just a raffle).
It would be nice if the website would:
    • Delete guest details as soon as the draw is complete.
    • Have automated draws (i.e. they happen at the user-specified time without any further user intervention and winner announcements happen automatically immediately afterwards)
    • Maintain security of both user accounts and guest entry details.
    • Limit the number of times a particular lucky number (or combination of lucky numbers) can be assigned to a particular user. If more than one user can select a particular lucky number, then the prize must be shareable.
