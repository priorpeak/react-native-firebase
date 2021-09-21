# Calorie Counter App

We have created an app that allows users to track their daily caloric intake by simply scanning a barcode or searching for a food by name. Our app pulls nutritional facts about the foods inputted from the FDA.

# Design Choices

Our app was created using React Native within the Expo framework while using Firebase as a means to host our data. Users login with their Gmail account, ensuring that we are not actually storing their private credentials, leaving us no liability for security concerns. On our home screen, we wanted to keep it minimalistic and simple by first displaying the user's total caloric count with the options to add servings, scan with barcode, or search for a food, followed by a list of the recent foods the user has inputted. The barcode scanner takes input from the user's camera and pulls data from the FDA's API, which is then stored onto our Firebase server. 
