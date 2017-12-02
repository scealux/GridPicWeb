GridPic TESTING Document

WHO
Ryan Loi
John Apel
Julia Sanford
Jordan Smart
Alex Fiel

TITLE:
GridPic

VISION: Using GridPic we want to provide a fun, interactive, and social way for people to experience the world around them.

AUTOMATED TESTS:


USER ACCEPTANCE TEST PLANS: There are three primary features for GridPic that will be tested. These are user sign-in / authentication, taking and saving a photo to the database, and displaying completed “GridPics” on the site.

-	User Sign-In / Authentication
  o	For user sign-in, we have utilized Google Firebase’s email/password login api
  o	To test this, all members of the group have created user accounts on the site
    -	If we successfully sign in, then the top of the site will display the email associated with the signed-in user
    i	If there is an issue with signing in with an email and password, we can adjust for that

-	Taking and saving photos to Firebase database
    o	Once a user is signed in, they will be redirected to the camera tab of the site,       where they will be able to take the four pictures that make up a GridPic
    o	When the user clicks one of the camera viewfinders, it will take the photo that is     associated to that spot in the 2x2 grid
    o	We will all attempt to take the photos associated with a GridPic, and if it is         successful then we will be able to see the four images stored in the Firebase           database

-	Displaying Completed GridPics
  o	Once the first two user features have been shown to be working, we will be able to     stitch the four user images together and display a completed GridPic
  o	The four images that make up a GridPic are stored in the Firebase database and         associated with a specific user
    -	These four images will be stitched together into a 2x2 grid and displayed on the     community tab on the site
  o	If, after taking the four photos, a completed GridPic is visible on the site, then     we will know that the functionality is working properly
