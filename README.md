# CRM Project

## Introduction to CRM

CRM (Customer Relationship Management) is a system used by organizations to manage customer information, track interactions, improve customer relationships, and streamline business processes. CRM helps businesses store customer data, manage leads, track sales activities, and provide better customer support.

## About Zoho CRM

Zoho CRM is a popular CRM platform that helps businesses manage leads, contacts, sales pipelines, and customer interactions. It provides features such as lead management, contact management, workflow automation, sales tracking, and reporting. Businesses use Zoho CRM to improve customer engagement and increase sales efficiency.

### Basic Zoho CRM Flow

Website Form / Inquiry
↓
Lead Created
↓
Sales Team Contact
↓
Customer Interested
↓
Deal Created
↓
Customer Purchase
↓
Contact Created
↓
Follow-up and Customer Support

## Project Overview

This project is a simple CRM application developed using:

* HTML
* CSS
* JavaScript
* Node.js
* Express.js
* MongoDB
* Mongoose

The application allows users to manage leads and contacts through an admin panel.

## Features

### Login System

* Admin login page with predefined email and password.
* Client-side validation for login credentials.
* Displays appropriate success and error messages.

### Lead Management

* Add new leads with Customer ID, Name, Email, and Password.
* Store lead information in MongoDB.
* View all available leads.
* Delete leads using Customer ID.
* Validation for duplicate Customer IDs and Emails.

### Contact Management

* Add contacts with Customer ID, Contact ID, Name, and Email.
* Store contact information in MongoDB.
* View all contacts.
* Validation for duplicate Contact IDs and Emails.

### Logout

* Logout button redirects the user back to the login page.
* Allows secure navigation from the admin panel.

## Project Workflow

Login Page
↓
Admin Panel
↓
Add Lead / View Leads / Delete Lead
↓
Add Contact / View Contacts
↓
Logout
↓
Return to Login Page

## Database

MongoDB is used as the database for storing:

### Leads Collection

* Customer ID
* Name
* Email
* Password

### Contacts Collection

* Customer ID
* Contact ID
* Name
* Email

## Learning Outcomes

Through this project, the following concepts were implemented and learned:

* CRUD Operations
* REST APIs
* MongoDB Integration
* Mongoose Schema Design
* Form Validation
* Client-Server Communication
* Express.js Routing
* Fetch API
* Basic Authentication Logic
* CRM Workflow Understanding

