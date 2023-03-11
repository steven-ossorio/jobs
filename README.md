# Jobs - Connect Job Seekers and Recruiters

## Purpose

The purpose of the project idea has come to light that majority of the "job" posting sights are more
of data collecting verse actually trying to help candidates connect with those who are able to offer a job.
Jobs seek to make it easier for recruiters seek out those who have been laidoff or open to work within their area
or from a specific company.

On the other spectrum, it also allows users to be able to look for jobs based on location and try to connect
with the recruiter that has posted the job/s.

Welcome to Jobs! lets help each other tackle to uncertain environment.

## Tech Stack

### Frontend

    - ReactJS
    - TailwindCSS (Styling)
    - GraphQL
    - Redux (Not implemented but in consideration)

### Backend

    - NextJS
    - PostgreSQL
    -GraphQL

## Tasks - MVP

- [x] Auth - Allow signup/signin for job seekers.
- [x] Landing page - Load up 6 recently joined job seekers to the main page.
- [x] Hide job seekers full info without signing up first.
- [x] Include a filter for job seekers to be searched (Location, Name, Company, Years of experience).
- [ ] Open drawer to view more info regards a job seeker. Should fetch more info to backend.
- [ ] Make sure all possible errors are being handled. Form and possible 500 fail requests.
- [ ] Create jobs table. Allow "recruiters" to post jobs into the job board
- [ ] Allow for CRUD with job posts
- [ ] Allow for profile picture upload. Use of AWS
- [ ] All people to search in the job board based on job title, location and years of experience

# Tasks - Follow up features

- [ ] Add jobs to favorite
- [ ] Update profile page
- [ ] Message to recruiters or recruiters to job seekers
- [ ] Add to favorite/follow (friends not in consideration currently)
- [ ] AWS Lambda functions
