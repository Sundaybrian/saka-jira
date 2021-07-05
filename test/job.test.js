openapi: 3.0.0
info:
    title: Urady API
    description: Apis for urady jobs module
    version: 1.0.0

servers:
    - url: http://localhost:5000/api/v1
      description: Local development server
    - url: https://urady.herokuapp.com/api/v1
      description: Development Server
    - url: https://uradybackend.tech/api/v1
      description: Prod Server    

paths:
    /accounts/register:
        post:
            tags:
                - "accounts"
            summary: Create a normal user and return user details and jwt token
            operationId: register user
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                first_name:
                                    type: string
                                    example: "sunday"
                                last_name:
                                    type: string
                                    example: "oliseh"
                                phone_number:
                                    type: string
                                    example: "0714382366"
                                email:
                                    type: string
                                    example: "sunday@oliseh.com"
                                password:
                                    type: string
                                    example: "myverysuperiorpass"
                                image_url:
                                    type: string
                                    example: "https://jkhasdfjdshfhdsfhjkdssdfjk"    
                            required:
                                - first_name
                                - last_name
                                - email
                                - password
                                - phone_number
            responses:
                "200":
                    description: The registration request was succesfull and a verification email has been sent to the specified email address
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    user:
                                        type: object
                                        properties:
                                            first_name:
                                                type: string
                                                example: "sunday"
                                            last_name:
                                                type: string
                                                example: "oliseh"
                                            email:
                                                type: string
                                                example: "sunday@oliseh.com"
                                            role:
                                                type: string
                                                example: "user"
                                            phone_number:
                                                type: string
                                                example: "0714382366"
                                            image_url:
                                                type: string
                                                example: ""    
                                            freelancer:
                                                type: object
                                                properties:
                                                    id:
                                                        type: integer
                                                        example: 1
                                                    user_id:
                                                        type: integer
                                                        example: 1
                                            hiringManager:
                                                type: object
                                                properties:
                                                    id:
                                                        type: integer
                                                        example: 1
                                                    user_id:
                                                        type: integer
                                                        example: 1
                                    token:
                                        type: string
                                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiYWRtaW4iLCJsYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpc1ZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNjA2MTU4MDkwLCJleHAiOjE2MDYxNjg4OTB9.o7npZt_wsUvvGiLW7Bu08zhzxKmM9I3enQ2X48m1b9U"
                                    message:
                                        type: string
                                        example: "Registration successfull, please check your email for verification instructions"

    /accounts/verify-email:
        post:
            tags:
                - "accounts"
            summary: verify a new account with a verification token received via email after registration
            operationId: verifyEmail
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                token:
                                    type: string
                                    example: "895789345uhuif78y87yf78f7gf34gr783478tgf7843gf87gf78478343478rfy7834yr782"
                            required:
                                - token
            responses:
                "200":
                    description: "Verification was successful"
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    message:
                                        type: string
                                        example: "Verification was succesfull"
                "400":
                    description: Verification failed due to an invalid token
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    message:
                                        type: string
                                        example: "Veification failed"

    /accounts/login:
        post:
            tags:
                - "accounts"
            summary: Authenticate account credentials and return a jwt token and user details
            operationId: authenticate
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                email:
                                    type: string
                                    example: "sunday@owner.com"
                                password:
                                    type: string
                                    example: "12345678yh"
                            required:
                                - email
                                - password
            responses:
                "200":
                    description: Accounts details and jwt token
                    headers:
                        Set-Cookie:
                            description: "`refreshToken`"
                            schema:
                                type: string
                                example: refreshToken=534654398597475894375873498758943758743895789347598347597349; Path=/; Expires=Tue, 16 Jun 2021 09:14:17 GMT; HttpOnly
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    user:
                                        type: object
                                        properties:
                                            id:
                                                type: integer
                                                example: 1
                                            first_name:
                                                type: string
                                                example: "sunday"
                                            last_name:
                                                type: string
                                                example: "owner"
                                            phone_number:
                                                type: string
                                                example: "0714382366"
                                            email:
                                                type: string
                                                example: "sunday@owner.com"
                                            image_url:
                                                type: string
                                                example: ""     
                                            role:
                                                type: string
                                                example: "user"
                                            freelancer:
                                                type: object
                                                properties:
                                                    id:
                                                        type: integer
                                                        example: 1
                                                    user_id:
                                                        type: integer
                                                        example: 1
                                            hiringManager:
                                                type: object
                                                properties:
                                                    id:
                                                        type: integer
                                                        example: 1
                                                    user_id:
                                                        type: integer
                                                        example: 1
                                    token:
                                        type: string
                                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWIxMmUxOTdlMDZhNzZjY2RlZmMxMjEiLCJpZCI6IjVlYjEyZTE5N2UwNmE3NmNjZGVmYzEyMSIsImlhdCI6MTU4ODc1ODE1N30.xR9H0STbFOpSkuGA9jHNZOJ6eS7umHHqKRhI807YT1Y"
                                    refreshToken:
                                        type: string
                                        example: "8578934875897348ur8rfu3489r8943uf8438rt8r489383489u"    
                "500":
                    description: Email or password is incorrect
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    message:
                                        type: string
                                        example: "Email or password is incorrect"
    /accounts/refresh-token:
        post:
            tags:
              - "accounts"
            summary: Use a refresh token to generate a new JWT token and a new refresh token
            description: The refresh token is sent and returned via cookies and body, in future it will be via cookies only
            operationId: refreshToken
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                refreshToken:
                                    type: string
                                    example: "75698348965689436784376789347679834769734789673489768967983679"
            responses:
                "200":
                    description: Accounts details and jwt token
                    headers:
                        Set-Cookie:
                            description: "`refreshToken`"
                            schema:
                                type: string
                                example: refreshToken=534654398597475894375873498758943758743895789347598347597349; Path=/; Expires=Tue, 16 Jun 2021 09:14:17 GMT; HttpOnly
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    user:
                                        type: object
                                        properties:
                                            id:
                                                type: integer
                                                example: 1
                                            first_name:
                                                type: string
                                                example: "sunday"
                                            last_name:
                                                type: string
                                                example: "owner"
                                            phone_number:
                                                type: string
                                                example: "0714382366"
                                            email:
                                                type: string
                                                example: "sunday@owner.com"
                                            image_url:
                                                type: string
                                                example: ""     
                                            role:
                                                type: string
                                                example: "user"
                                            freelancer:
                                                type: object
                                                properties:
                                                    id:
                                                        type: integer
                                                        example: 1
                                                    user_id:
                                                        type: integer
                                                        example: 1
                                            hiringManager:
                                                type: object
                                                properties:
                                                    id:
                                                        type: integer
                                                        example: 1
                                                    user_id:
                                                        type: integer
                                                        example: 1
                                    token:
                                        type: string
                                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWIxMmUxOTdlMDZhNzZjY2RlZmMxMjEiLCJpZCI6IjVlYjEyZTE5N2UwNmE3NmNjZGVmYzEyMSIsImlhdCI6MTU4ODc1ODE1N30.xR9H0STbFOpSkuGA9jHNZOJ6eS7umHHqKRhI807YT1Y"
                                    refreshToken:
                                        type: string
                                        example: "8578934875897348ur8rfu3489r8943uf8438rt8r489383489u"    
                "500":
                    description: The refresh token is invalid, revoked or expired
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    message:
                                        type: string
                                        example: "Invalid token"                                            
    /accounts/create-staff:
        post:
            tags:
                - "accounts"
            summary: Create a new staff account
            description: Restricted to admin users.
            operationId: createstaffaccount
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                first_name:
                                    type: string
                                    example: "jason"
                                last_name:
                                    type: string
                                    example: "borne"
                                email:
                                    type: string
                                    example: "jason@borne.com"
                                password:
                                    type: string
                                    example: "pass12334567"
                                role:
                                    type: string
                                    enum: [staff, admin]
                            required:
                                - first_name
                                - last_name
                                - email
                                - password
                                - role
            responses:
                "200":
                    description: Account created successfully, verification is not required for accounts created with this endpoint. The details of the new account are returned.
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 58
                                    first_name:
                                        type: string
                                        example: "jason"
                                    last_name:
                                        type: string
                                        example: "borne"
                                    email:
                                        type: string
                                        example: "jason@borne.com"
                                    role:
                                        type: string
                                        example: "staff"
                                    created:
                                        type: string
                                        example: "2020-05-05T09:12:57.848Z"
                "400":
                    description: Email is already registered
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    message:
                                        type: string
                                        example: "Email 'jason@borne.com' is already registered"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"
                "403":
                    $ref: "#/components/responses/AccessDenied"
    /accounts/forgot-password:
        post:
            tags:
                - "accounts"
            summary: Submit Email address to reset the password on an account
            operationId: forgotPassword
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                email: 
                                    type: string
                                    example: "sunday@owner.com"
                            required:
                                - email
            responses:
                "200":
                    description: The requested was received and an email has been sent to the specified address with password reset instructions (if the email is associated with an account)
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    message:
                                        type: string
                                        example: "Please check your email for password reset instructions"                    

    /accounts/validate-reset-token:
        post:
            tags:
                - "accounts"
            summary: Validate the reset password token received by email after submitting to the /accounts/forgot-password route
            operationId: validateResetToken
            requestBody:
                required: true
                content:
                  application/json:
                      schema:
                        type: object
                        properties:
                            token:
                                type: string
                                example: "3c7f8d9c4cb348ff95a0b74a1452aa24fc9611bb76768bb9eafeeb826ddae2935f1880bc7713318f"
                        required:
                            - token
            responses:
                "200":
                    description: Token is valid
                    content:
                        application/json:
                          schema:
                              type: object
                              properties:
                                  message:
                                      type: string
                                      example: "Token is valid"
                "400":
                    description: Token is invalid
                    content:
                        application/json:
                          schema:
                              type: object
                              properties:
                                  message:
                                      type: string
                                      example: "Invalid token"
    /accounts/reset-password:
        post:
            tags:
                - "accounts"
            summary: Reset the password for an account
            operationId: resetPassword
            requestBody:
                required: true
                content:
                  application/json:
                      schema:
                          type: object
                          properties:
                              token:
                                  type: string
                                  example: "3c7f8d9c4cb348ff95a0b74a1452aa24fc9611bb76768bb9eafeeb826ddae2935f1880bc7713318f"
                              password:
                                  type: string
                                  example: "newPass123"
                              confirmPassword:
                                  type: string
                                  example: "newPass123"
                          required:
                              - token
                              - password
                              - confirmPassword
            responses:
                "200":
                    description: Password reset was successful so you can now login to the account with the new password
                    content:
                        application/json:
                          schema:
                              type: object
                              properties:
                                message:
                                    type: string
                                    example: "Password reset successful, you can now login"
                "400":
                    description: Password reset failed due to an invalid token
                    content:
                        application/json:
                          schema:
                              type: object
                              properties:
                                message:
                                    type: string
                                    example: "Invalid token"

    /accounts:
        get:
            tags:
                - "accounts"
            parameters:
                - in: query
                  name: queryparams
                  schema:
                      type: object
                      properties:
                          limit:
                              type: integer
                              example: 20
                          nextPage:
                              type: string
                              example: "KGRhdGUpMjAyMS0wMi0wM1QyMDozMjo0MC43NTda"
                  style: form
                  explode: true
            summary: Get a list of all accounts
            description: Restricted to admin . Has pagination and can accept query params for rich data querying. By default the endpoint will get all users with with a limit of 10 , nextPage query param will be generated after the first query. A pageInfo will dictate the items left and how to fetch next data
            operationId: getallaccounts
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: An array of all accounts
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    results:
                                        type: array
                                        items:
                                            type: object
                                            properties:
                                                id:
                                                    type: number
                                                    example: 1
                                                first_name:
                                                    type: string
                                                    example: "sunday"
                                                last_name:
                                                    type: string
                                                    example: "oliseh"
                                                email:
                                                    type: string
                                                    example: "sunday@oliseh.com"
                                                image_url:
                                                    type: string
                                                    example: ""     
                                                role:
                                                    type: string
                                                    example: "user"
                                                phone_number:
                                                    type: string
                                                    example: "0714382366"
                                                created_at:
                                                    type: string
                                                    example: "2020-05-05T09:12:57.848Z"
                                                updated_at:
                                                    type: string
                                                    example: "2020-05-08T03:11:21.553Z"
                                    pageInfo:
                                        type: object
                                        properties:
                                            total:
                                                type: integer
                                                example: 30
                                            remaining:
                                                type: integer
                                                example: 20
                                            hasMore:
                                                type: boolean
                                                example: true
                                            hasPrevious:
                                                type: boolean
                                                example: true
                                            hasNext:
                                                type: boolean
                                                example: true
                                            next:
                                                type: string
                                                example: "KGRhdGUpMjAyMS0wMi0wNFQwMDo1ODoyOS4xODNa"
                                            previous:
                                                type: string
                                                example: "KGRhdGUpMjAyMS0wMi0wNFQwMDo1ODoyOS4xODNat"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /accounts/{id}:
        parameters:
            - in: path
              name: id
              description: Account id
              required: true
              example: 1
              schema:
                  type: integer
        get:
            tags:
                - "accounts"
            summary: Get a single account by id
            description: Admin users can access any account, regular users are restricted to their own account
            operationId: getaccountbyid
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: Details of the specified account
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    first_name:
                                        type: string
                                        example: "sunday"
                                    last_name:
                                        type: string
                                        example: "oliseh"
                                    email:
                                        type: string
                                        example: "sunday@oliseh.com"
                                    phone_number:
                                        type: string
                                        example: "071234569"
                                    created_at:
                                        type: string
                                        example: "2020-05-05T09:12:57.848Z"
                                    updated_at:
                                        type: string
                                        example: "2020-05-05T09:12:57.848Z"
                                    image_url:
                                        type: string
                                        example: "https://hhsdjfhjdshfjhdsjkfh.com"    
                                    role:
                                        type: string
                                        example: "user"
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        patch:
            tags:
                - "accounts"
            summary: Update an account
            description: Admin users can update any account, regular users are restricted to their own account and soon they wont be able to update role
            operationId: updateaccount
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                firstName:
                                    type: string
                                    example: "michael"
                                lastName:
                                    type: string
                                    example: "smith"
                                email:
                                    type: string
                                    example: "michael@smith.com"
                                image_url:
                                    type: string
                                    example: "https://storag.bcket.com"    
                                password:
                                    type: string
                                    example: "pass12345678"
                                confirmPassword:
                                    type: string
                                    example: "pass12345678"
                                role:
                                    type: string
                                    enum: [admin, owner, staff, customer]
            responses:
                "200":
                    description: Account updated successfully. The details of the updated user are returned
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 51
                                    first_name:
                                        type: string
                                        example: "michael"
                                    last_name:
                                        type: string
                                        example: "smith"
                                    phone_number:
                                        type: string
                                        example: "0733455780"
                                    image_url:
                                        type: string
                                        example: "https://jkdshfdjsfhjdsfjhdhf"    
                                    email:
                                        type: string
                                        example: "michael@smith.com"
                                    role:
                                        type: string
                                        example: "staff"
                                    created_at:
                                        type: string
                                        example: "2020-05-05T09:12:57.848Z"
                                    updated_at:
                                        type: string
                                        example: "2020-05-08T03:11:21.553Z"

                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        delete:
            tags:
                - "accounts"
            summary: Delete an account
            description: Admin users can delete any account, regular users are restricted to their own account.
            operationId: deleteaccount
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: Account deleted successfully
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    message:
                                        type: string
                                        example: "Account deleted successfully"
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"
    /images/avatar:
      post:
        tags:
          - "images"
        summary: Opload na user avatar
        operationId: uploadavatar
        description: Upload avatar form data to s3 and get url. The image form data should have the fieldname image key as avatar
        requestBody:
          required: true
          content:
            multipart/form-data:
              schema:
                type: object
                properties:
                  avatar:
                    type: string
                    format: binary
                #   fieldname: 
                #     type: string
                #     example: 'avatar'
        responses: 
          '200':
            description: image uploaded successfully
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    image_url:
                      type: string
                      example: '/images/avatar/886785568676789568957'
            
        
    /subscriptionType/:
        post:
            tags:
                - "subscriptionType"
            summary: Create a subscription
            operationId: createsubscriptiontype
            description: Admin users can create subscriptions
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                name:
                                    type: string
                                    example: "Day"
                                description:
                                    type: string
                                    example: "daily subscription model"
                                amount:
                                    type: integer
                                    example: 20
                                subscription_duration:
                                    type: string
                                    example: "Day"
                                duration_in_days:
                                    type: integer
                                    example: 1
                            required:
                                - name
                                - amoount
                                - subscription_duration
                                - duration_in_days
            responses:
                "200":
                    description: Subscription was correctly inserted
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    name:
                                        type: string
                                        example: "Day"
                                    description:
                                        type: string
                                        example: "daily subscription model"
                                    amount:
                                        type: integer
                                        example: 20
                                    subscription_duration:
                                        type: string
                                        example: "Day"
                                    duration_in_days:
                                        type: integer
                                        example: 1

    /subscriptionType:
        get:
            tags:
                - "subscriptionType"
            summary: Get a list of all subscriptions
            description: Open to all users
            security:
                - bearerAuth: []
            operationId: getallsubscriptionstypes
            responses:
                "200":
                    description: An array of all subscriptions
                    content:
                        application/json:
                            schema:
                                type: array
                                items:
                                    type: object
                                    properties:
                                        name:
                                            type: string
                                            example: "Day"
                                        description:
                                            type: string
                                            example: "daily subscription model"
                                        amount:
                                            type: integer
                                            example: 20
                                        subscription_duration:
                                            type: string
                                            example: "Day"
                                        duration_in_days:
                                            type: integer
                                            example: 1
                                        created_at:
                                            type: string
                                            example: "2020-05-05T09:12:57.848Z"
                                        updated_at:
                                            type: string
                                            example: "2020-05-08T03:11:21.553Z"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /subscriptionType/{id}:
        parameters:
            - in: path
              name: id
              description: subscriptionType id
              required: true
              example: 1
              schema:
                  type: integer
        get:
            tags:
                - "subscriptionType"
            summary: Get a single subscriptionType by id
            description: Open to all user
            operationId: getsubscriptionTypeid
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: Details of the specified subscriptionType
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    name:
                                        type: string
                                        example: "Day"
                                    description:
                                        type: string
                                        example: "daily subscription model"
                                    amount:
                                        type: integer
                                        example: 20
                                    subscription_duration:
                                        type: string
                                        example: "Day"
                                    duration_in_days:
                                        type: integer
                                        example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        patch:
            tags:
                - "subscriptionType"
            summary: Update a subscriptionType
            description: Admin users can update any subscriptionType
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                name:
                                    type: string
                                    example: "Day"
                                description:
                                    type: string
                                    example: "daily subscription model"
                                amount:
                                    type: integer
                                    example: 20
                                subscription_duration:
                                    type: string
                                    example: "Day"
                                duration_in_days:
                                    type: integer
                                    example: 1
            responses:
                "200":
                    description: subscriptionType updated successfully. The details of the subscriptionType are returned
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    name:
                                        type: string
                                        example: "Day"
                                    description:
                                        type: string
                                        example: "daily subscription model"
                                    amount:
                                        type: integer
                                        example: 20
                                    subscription_duration:
                                        type: string
                                        example: "Day"
                                    duration_in_days:
                                        type: integer
                                        example: 1

                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        delete:
            tags:
                - "subscriptionType"
            summary: Delete a subscriptionType
            description: Admin users can delete any subscriptionType, regular users are restricted.
            operationId: deletesubscriptionType
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: subscriptionType deleted successfully
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /jobStatus/:
        post:
            tags:
                - "jobStatus"
            summary: Create a jobStatus
            operationId: createjobStatus
            description: Admin users can create jobStatus
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                job_status_name:
                                    type: string
                                    example: "finished"
                            required:
                                - job_status_name

            responses:
                "200":
                    description: jobStatus was correctly inserted
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    job_status_name:
                                        type: string
                                        example: "finished"

    /jobStatus:
        get:
            tags:
                - "jobStatus"
            summary: Get a list of all jobStatuses
            description: Open to all users
            security:
                - bearerAuth: []
            operationId: getalljobStatuses
            responses:
                "200":
                    description: An array of all jobStatuses
                    content:
                        application/json:
                            schema:
                                type: array
                                items:
                                    type: object
                                    properties:
                                        id:
                                            type: integer
                                            example: 1
                                        job_status_name:
                                            type: string
                                            example: "accepting quotes"

                                        created_at:
                                            type: string
                                            example: "2020-05-05T09:12:57.848Z"
                                        updated_at:
                                            type: string
                                            example: "2020-05-08T03:11:21.553Z"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /jobStatus/{id}:
        parameters:
            - in: path
              name: id
              description: jobStatus id
              required: true
              example: 1
              schema:
                  type: integer
        get:
            tags:
                - "jobStatus"
            summary: Get a single jobStatus by id
            description: Open to all user
            operationId: getjobStatusByID
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: Details of the specified jobStatus
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    job_status_name:
                                        type: string
                                        example: "accepting quotes"
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        patch:
            tags:
                - "jobStatus"
            summary: Update a jobStatus
            description: Admin users can update any jobStatus
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                job_status_name:
                                    type: string
                                    example: "inprogress"

            responses:
                "200":
                    description: jobStatus updated successfully. The details of the jobStatus are returned
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    job_status_name:
                                        type: string
                                        example: "inprogress"

                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        delete:
            tags:
                - "jobStatus"
            summary: Delete a jobStatus
            description: Admin users can delete any jobStatus, regular users are restricted.
            operationId: deletejobStatus
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: jobStatus deleted successfully
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /industry:
        get:
            tags:
                - "industry"
            summary: Get a list of all industries types
            description: Open to all users
            security:
                - bearerAuth: []
            operationId: getallindustry
            responses:
                "200":
                    description: An array of all industries
                    content:
                        application/json:
                            schema:
                                type: array
                                items:
                                    type: object
                                    properties:
                                        id:
                                            type: integer
                                            example: 1
                                        industry_name:
                                            type: string
                                            example: "Marketing"
                                        created_at:
                                            type: string
                                            example: "2020-05-05T09:12:57.848Z"
                                        updated_at:
                                            type: string
                                            example: "2020-05-08T03:11:21.553Z"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        post:
            tags:
                - "industry"
            summary: Add a new Industry
            operationId: createindustry
            description: Admin users can create a new industry
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                industry_name:
                                    type: string
                                    example: "Delivery"
                            required:
                                - industry

            responses:
                "200":
                    description: industry was correctly inserted
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    industry_name:
                                        type: string
                                        example: "Delivery"

    /industry/{id}:
        parameters:
            - in: path
              name: id
              description: industry id
              required: true
              example: 1
              schema:
                  type: integer
        get:
            tags:
                - "industry"
            summary: Get a single industry by id
            description: Open to all user
            operationId: getindustryByID
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: Details of the specified industry
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    industry_name:
                                        type: string
                                        example: "Writing"
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        patch:
            tags:
                - "industry"
            summary: Update an industry name
            description: Admin users can update any industry
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                industry_name:
                                    type: string
                                    example: "Electrical"

            responses:
                "200":
                    description: industry updated successfully. The details of the industry are returned
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    industry_name:
                                        type: string
                                        example: "Electrical"

                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        delete:
            tags:
                - "industry"
            summary: Delete a industry
            description: Admin users can delete any industry, regular users are restricted. Just be careful deleting an industry will cascade jobs under it
            operationId: deleteindustry
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: industry deleted successfully
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /skill:
        get:
            tags:
                - "skill"
            deprecated: true
            summary: Get a list of all skill types
            description: Open to all users
            security:
                - bearerAuth: []
            operationId: getallskills
            responses:
                "200":
                    description: An array of all skill
                    content:
                        application/json:
                            schema:
                                type: array
                                items:
                                    type: object
                                    properties:
                                        id:
                                            type: integer
                                            example: 1
                                        skill_name:
                                            type: string
                                            example: "Project Management"
                                        created_at:
                                            type: string
                                            example: "2020-05-05T09:12:57.848Z"
                                        updated_at:
                                            type: string
                                            example: "2020-05-08T03:11:21.553Z"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        post:
            tags:
                - "skill"
            deprecated: true
            summary: Add a new skill
            operationId: createskill
            description: Admin users can create a new skill
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                skill_name:
                                    type: string
                                    example: "Python"
                            required:
                                - skill_name

            responses:
                "200":
                    description: skill was correctly inserted
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    skill_name:
                                        type: string
                                        example: "Python"

    /skill/{id}:
        parameters:
            - in: path
              name: id
              description: skill id
              required: true
              example: 1
              schema:
                  type: integer
        get:
            tags:
                - "skill"
            deprecated: true
            summary: Get a single skill by id
            description: Open to all user
            operationId: getskillByID
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: Details of the specified skill
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    skill_name:
                                        type: string
                                        example: "Writing"
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        patch:
            tags:
                - "skill"
            deprecated: true
            summary: Update a skill name
            description: Admin users can update any skill
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                skill_name:
                                    type: string
                                    example: "Electrical Installation"

            responses:
                "200":
                    description: skill updated successfully. The details of the skill are returned
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    skill_name:
                                        type: string
                                        example: "Electrica Installation"

                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        delete:
            tags:
                - "skill"
            deprecated: true
            summary: Delete a skill
            description: Admin users can delete any skill, regular users are restricted. Future implementation is making sure we dont cascade dependent tables when a skill is removed
            operationId: deleteskill
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: skill deleted successfully
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /proposalStatus:
        get:
            tags:
                - "proposalStatus"
            summary: Get a list of all proposalStatus types
            description: Open to all users
            security:
                - bearerAuth: []
            operationId: getallproposalStatuss
            responses:
                "200":
                    description: An array of all proposalStatus
                    content:
                        application/json:
                            schema:
                                type: array
                                items:
                                    type: object
                                    properties:
                                        id:
                                            type: integer
                                            example: 1
                                        proposal_status_name:
                                            type: string
                                            example: "accepted"
                                        created_at:
                                            type: string
                                            example: "2020-05-05T09:12:57.848Z"
                                        updated_at:
                                            type: string
                                            example: "2020-05-08T03:11:21.553Z"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        post:
            tags:
                - "proposalStatus"
            summary: Add a new proposalStatus
            operationId: createproposalStatus
            description: Admin users can create a new proposalStatus
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                proposal_status_name:
                                    type: string
                                    example: "rejected"
                            required:
                                - proposal_status_name

            responses:
                "200":
                    description: proposalStatus was correctly inserted
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    proposal_status_name:
                                        type: string
                                        example: "rejected"

    /proposalStatus/{id}:
        parameters:
            - in: path
              name: id
              description: proposalStatus id
              required: true
              example: 1
              schema:
                  type: integer
        get:
            tags:
                - "proposalStatus"
            summary: Get a single proposalStatus by id
            description: Open to all user
            operationId: getproposalStatusByID
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: Details of the specified proposalStatus
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    proposal_status_name:
                                        type: string
                                        example: "negotiating"
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        patch:
            tags:
                - "proposalStatus"
            summary: Update a proposalStatus name
            description: Admin users can update any proposalStatus
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                proposal_status_name:
                                    type: string
                                    example: "negotiations"

            responses:
                "200":
                    description: proposalStatus updated successfully. The details of the proposalStatus are returned
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    proposal_status_name:
                                        type: string
                                        example: "negotiations"

                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        delete:
            tags:
                - "proposalStatus"
            summary: Delete a proposalStatus
            description: Admin users can delete any proposalStatus, regular users are restricted. Future implementation is making sure we dont cascade dependent tables when a proposalStatus is removed
            operationId: deleteproposalStatus
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: proposalStatus deleted successfully
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /paymentType:
        get:
            tags:
                - "paymentType"
            summary: Get a list of all paymentType types
            description: Open to all users
            security:
                - bearerAuth: []
            operationId: getallpaymentTypes
            responses:
                "200":
                    description: An array of all paymentType
                    content:
                        application/json:
                            schema:
                                type: array
                                items:
                                    type: object
                                    properties:
                                        id:
                                            type: integer
                                            example: 1
                                        payment_type_name:
                                            type: string
                                            example: "Fixed"
                                        created_at:
                                            type: string
                                            example: "2020-05-05T09:12:57.848Z"
                                        updated_at:
                                            type: string
                                            example: "2020-05-08T03:11:21.553Z"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        post:
            tags:
                - "paymentType"
            summary: Add a new paymentType
            operationId: createpaymentType
            description: Admin users can create a new paymentType
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                payment_type_name:
                                    type: string
                                    example: "PerMonth"
                            required:
                                - payment_type_name

            responses:
                "200":
                    description: paymentType was correctly inserted
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    payment_type_name:
                                        type: string
                                        example: "PerMonth"

    /paymentType/{id}:
        parameters:
            - in: path
              name: id
              description: paymentType id
              required: true
              example: 1
              schema:
                  type: integer
        get:
            tags:
                - "paymentType"
            summary: Get a single paymentType by id
            description: Open to all user
            operationId: getpaymentTypeByID
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: Details of the specified paymentType
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    payment_type_name:
                                        type: string
                                        example: "PerHour"
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        patch:
            tags:
                - "paymentType"
            summary: Update a paymentType name
            description: Admin users can update any paymentType
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                payment_type_name:
                                    type: string
                                    example: "PerHour"

            responses:
                "200":
                    description: paymentType updated successfully. The details of the paymentType are returned
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    payment_type_name:
                                        type: string
                                        example: "PerHour"

                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        delete:
            tags:
                - "paymentType"
            summary: Delete a paymentType
            description: Admin users can delete any paymentType, regular users are restricted. Future implementation is making sure we dont cascade dependent tables when a paymentType is removed
            operationId: deletepaymentType
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: paymentType deleted successfully
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /freelancer:
        get:
            tags:
                - "freelancer"
            parameters:
                - in: query
                  name: queryParams
                  schema:
                      type: object
                      properties:
                          nextPage:
                              type: string
                          limit:
                              type: integer
                              example: 30
                          industry:
                              type: integer
                              example: 1
                  style: form
                  explode: true
            summary: Get a list of all freelancers
            description: Open to all users. You can query using industry and limit to a given
            security:
                - bearerAuth: []
            operationId: getallfreelancers
            responses:
                "200":
                    description: An array of all freelancers
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    results:
                                        type: array
                                        items:
                                            type: object
                                            properties:
                                                id:
                                                    type: integer
                                                    example: 1
                                                user_id:
                                                    type: integer
                                                    example: 1
                                                description:
                                                    type: string
                                                    example: "super backend engineer"
                                                industry_id:
                                                    type: integer
                                                    example: 1
                                                hiring_manager_id:
                                                    type: integer
                                                    example: 1
                                                latitude:
                                                    type: number
                                                    example: 38.676
                                                longitude:
                                                    type: number
                                                    example: -1.566
                                                created_at:
                                                    type: string
                                                    example: "2020-05-05T09:12:57.848Z"
                                                updated_at:
                                                    type: string
                                                    example: "2020-05-08T03:11:21.553Z"
                                                skills:
                                                    type: array
                                                    items:
                                                        type: object
                                                        properties:
                                                            id:
                                                                type: integer
                                                                example: 1
                                                            skill_name:
                                                                type: integer
                                                                example: "Python"
                                                user:
                                                    type: object
                                                    properties:
                                                        id:
                                                            type: integer
                                                            example: 1
                                                        first_name:
                                                            type: string
                                                            example: "sunday"
                                                        last_name:
                                                            type: string
                                                            example: "brina"
                                                        email:
                                                            type: string
                                                            example: "brians931@gmail.com"
                                                        phone_number:
                                                            type: string
                                                            example: "0714382344"
                                                        active:
                                                            type: boolean
                                                            example: true
                                                        isVerified:
                                                            type: boolean
                                                            example: false
                                                        image_url:
                                                            type: string
                                                            example: "https://firebase.com/jhdfkdshfjkfs,.jpeg"
                                                        created_at:
                                                            type: string
                                                            example: "2021-02-11T10:14:54.742Z"
                                                        updated_at:
                                                            type: string
                                                            example: "2021-02-11T10:14:54.742Z"
                                                        industry:
                                                            type: object
                                                            properties:
                                                                id:
                                                                    type: integer
                                                                    example: 1
                                                                industry_name:
                                                                    type: string
                                                                    example: "Computer Programming"

                                    pageInfo:
                                        type: object
                                        properties:
                                            total:
                                                type: integer
                                                example: 30
                                            remaining:
                                                type: integer
                                                example: 20
                                            hasMore:
                                                type: boolean
                                                example: true
                                            hasPrevious:
                                                type: boolean
                                                example: true
                                            hasNext:
                                                type: boolean
                                                example: true
                                            next:
                                                type: string
                                                example: "KGRhdGUpMjAyMS0wMi0wNFQwMDo1ODoyOS4xODNa"
                                            previous:
                                                type: string
                                                example: "KGRhdGUpMjAyMS0wMi0wNFQwMDo1ODoyOS4xODNat"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        post:
            tags:
                - "freelancer"
            summary: Add a freelancer profile
            operationId: createfreelancerprofile
            description: users can create a freelancer profile. Technically you will not require to use this endpoint , since a relation will be created on user signup
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                industry_id:
                                    type: integer
                                    example: 1
                                latitude:
                                    type: number
                                    example: 36.78678678
                                longitude:
                                    type: number
                                    example: -1.546567
                            required:
                                - industry_id

            responses:
                "200":
                    description: freelancer profile was correctly inserted if lat and long were not provided, they default to greenwich coordinates of (0,0)
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    industry_id:
                                        type: integer
                                        example: 1
                                    latitude:
                                        type: number
                                        example: 36.78678678
                                    longitude:
                                        type: number
                                        example: -1.5465677

    /freelancer/{freelancer_id}/freelancerStats/{hiring_manager_id}:
        get:
            tags:
                - "freelancer"
            parameters:
                - in: path
                  name: freelancer_id
                  description: freelancer id
                  required: true
                  example: 1
                  schema:
                      type: integer
                - in: path
                  name: hiring_manager_id
                  description: hiring_manager_id id
                  required: true
                  example: 1
                  schema:
                      type: integer
            summary: Get a freelancers stats

            description: Open to all users.
            security:
                - bearerAuth: []
            operationId: getfreelancerstats
            responses:
                "200":
                    description: Freelancer stats
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    inprogress:
                                        type: integer
                                        example: 1
                                    completed:
                                        type: integer
                                        example: 0
                                    jobsPosted:
                                        type: integer
                                        example: 1
                                    rating:
                                        type: integer
                                        example: 0

    /freelancer/{id}:
        parameters:
            - in: path
              name: id
              description: freelancer id
              required: true
              example: 1
              schema:
                  type: integer
        get:
            tags:
                - "freelancer"
            summary: Get a freelancer  by id
            description: Open to all users
            operationId: getfreelancerByID
            security:
                - bearerAuth: []
            responses:
                "200":
                    $ref: "#/components/responses/FreelancerResponse"
                "404":
                    $ref: "#/components/responses/NotFoundError"

        patch:
            tags:
                - "freelancer"
            summary: Update a freelancer profile
            description: Freelancers can update their own profiles
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                industry_id:
                                    type: integer
                                    example: 1
                                latitude:
                                    type: number
                                    example: 36.78678678
                                longitude:
                                    type: number
                                    example: -1.5465677
                                description:
                                    type: string
                                    example: "the best backend developer"

            responses:
                "200":
                    description: freelancer updated successfully. The details of the freelancer are returned
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    industry_id:
                                        type: integer
                                        example: 1
                                    latitude:
                                        type: number
                                        example: 36.78678678
                                    longitude:
                                        type: number
                                        example: -1.546567
                                    description:
                                        type: string
                                        example: "the best backend developer"

                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        delete:
            tags:
                - "freelancer"
            summary: Delete a freelancer
            description: Admin users can delete any freelancer, regular users are restricted. Future implementation is making sure we cascade user tables and any other data
            operationId: deletefreelancer
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: freelancer deleted successfully
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /freelancer/{id}/customskills:
        parameters:
            - in: path
              name: id
              description: freelancer id
              required: true
              example: 1
              schema:
                  type: integer
        get:
            tags:
                - "freelancer"
            summary: Get my freelancer skills
            description: Restricted to freeelancer and admin
            operationId: getfreelancerSkills
            security:
                - bearerAuth: []
            responses:
                "200":
                    $ref: "#/components/responses/FreelancerSkillsResponse"
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        post:
            tags:
                - "freelancer"
            summary: Add a skill
            description: Freelancers can add as many skills as possible
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                skill_name:
                                    type: integer
                                    example: "kufua nguo"

            responses:
                "200":
                    description: freelancer skills registered successfully. The details of the freelancer skills are returned
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    skill_name:
                                        type: integer
                                        example: "kufua nguo"
                                    freelancer_id:
                                        type: integer
                                        example: 1
                                    id:
                                        type: integer
                                        example: 1

                "400":
                    $ref: "#/components/responses/BadRequestError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /freelancer/{id}/customSkills/{skill_id}:
        parameters:
            - in: path
              name: id
              description: freelancer id
              required: true
              example: 1
              schema:
                  type: integer
            - in: path
              name: skill_id
              required: true
              example: 1
              schema:
                  type: integer

        delete:
            tags:
                - "freelancer"
            summary: Delete a freelancer skill
            description: Admin users can delete any freelancer skill, regular users are restricted.
            operationId: deletefreelancerskill
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: freelancer skill deleted successfully
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"
                "400":
                    $ref: "#/components/responses/BadRequestError"

    /hiringManager:
        get:
            tags:
                - "hiringManager"
            summary: Get a list of all hiringManager
            description: Open to all users, update will have pagination and query params
            security:
                - bearerAuth: []
            operationId: getallhiringManager
            responses:
                "200":
                    description: An array of all hiringManager
                    content:
                        application/json:
                            schema:
                                type: array
                                items:
                                    type: object
                                    properties:
                                        id:
                                            type: integer
                                            example: 1
                                        first_name:
                                            type: string
                                            example: "Sunday"
                                        last_name:
                                            type: string
                                            example: "Owner"
                                        latitude:
                                            type: number
                                            example: 38.676
                                        longitude:
                                            type: number
                                            example: -1.566
                                        email:
                                            type: string
                                            example: "sunday@owner.com"
                                        phone_number:
                                            type: string
                                            example: "0714382366"
                                        created_at:
                                            type: string
                                            example: "2020-05-05T09:12:57.848Z"
                                        updated_at:
                                            type: string
                                            example: "2020-05-08T03:11:21.553Z"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        post:
            tags:
                - "hiringManager"
            summary: Add a hiringManager profile
            operationId: createhiringManagerprofile
            description: users can create a hiringManager profile. Technically you will not require to use this endpoint, just as freelancer will not use theirs , since a relation will be created on user signup
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                user_id:
                                    type: integer
                                    example: 1
                                latitude:
                                    type: number
                                    example: 36.78678678
                                longitude:
                                    type: number
                                    example: -1.546567
                            required:
                                - user_id

            responses:
                "200":
                    description: hiringManager profile was correctly inserted if lat and long were not provided, they default to greenwich coordinates of (0,0)
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    user_id:
                                        type: integer
                                        example: 1
                                    latitude:
                                        type: number
                                        example: 36.78678678
                                    longitude:
                                        type: number
                                        example: -1.5465677

    /hiringManager/{id}:
        parameters:
            - in: path
              name: id
              description: hiringManager id
              required: true
              example: 1
              schema:
                  type: integer
        get:
            tags:
                - "hiringManager"
            summary: Get a hiringManager  by id
            description: Open to all users
            operationId: gethiringManagerByID
            security:
                - bearerAuth: []
            responses:
                "200":
                    $ref: "#/components/responses/FreelancerResponse"
                "404":
                    $ref: "#/components/responses/NotFoundError"

        patch:
            tags:
                - "hiringManager"
            summary: Update a hiringManager profile
            description: hiringManager can update their own profiles, and admin can update any profile
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                latitude:
                                    type: number
                                    example: 36.78678678
                                longitude:
                                    type: number
                                    example: -1.5465677

            responses:
                "200":
                    description: hiringManager updated successfully. The details of the hiringManager are returned
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    latitude:
                                        type: number
                                        example: 36.78678678
                                    longitude:
                                        type: number
                                        example: -1.546567'

                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        delete:
            tags:
                - "hiringManager"
            summary: Delete a hiringManager
            description: Admin users can delete any hiringManager, regular users are restricted. Future implementation is making sure we cascade user tables and any other data
            operationId: deletehiringManager
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: hiringManager deleted successfully
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"
    /hiringManager/hiringManagerStats/{hiring_manager_id}:
        get:
            tags:
                - "hiringManager"
            parameters:
                - in: path
                  name: hiring_manager_id
                  description: hiring manager id
                  required: true
                  example: 1
                  schema:
                      type: integer
               
            summary: Get a hiring manager stats

            description: Open to all users.
            security:
                - bearerAuth: []
            operationId: gethiringManagerstats
            responses:
                "200":
                    description: Hiring manager stats
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                  
                                    jobsCompleted:
                                        type: integer
                                        example: 0
                                    jobsPosted:
                                        type: integer
                                        example: 1
                                    rating:
                                        type: integer
                                        example: 0
    /freelancerSubscription:
        get:
            tags:
                - "freelancerSubscription"
            summary: Get a list of all freelancerSubscription
            description: Restricted to admin users, update will have pagination and query params
            security:
                - bearerAuth: []
            operationId: getallfreelancerSubscriptions
            responses:
                "200":
                    description: An array of all freelancerSubscription, update will have join with user table
                    content:
                        application/json:
                            schema:
                                type: array
                                items:
                                    type: object
                                    properties:
                                        freelancer_id:
                                            type: integer
                                            example: 1
                                        expiry_date:
                                            type: string
                                            example: "2020-05-05T09:12:57.848Z"
                                        created_at:
                                            type: string
                                            example: "2020-05-05T09:12:57.848Z"
                                        updated_at:
                                            type: string
                                            example: "2020-05-08T03:11:21.553Z"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        post:
            tags:
                - "freelancerSubscription"
            summary: Create a freelancer freelancerSubscription, restricted to admins
            operationId: createfreelancerfreelancerSubscription
            description: Technically you will not be required to use this endpoint, only edge cases like the db failing to create an initial subscription; then will you actually need it
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                freelancer_id:
                                    type: integer
                                    example: 1
                                expiry_date:
                                    type: string
                                    example: "2020-05-08T03:11:21.553Z"
                            required:
                                - freelancer_id
                                - expiry_date

            responses:
                "200":
                    description: freelancer freelancerSubscription was correctly inserted and expiry_date set
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    freelancer_id:
                                        type: integer
                                        example: 1
                                    expiry_date:
                                        type: string
                                        example: "2020-05-08T03:11:21.553Z"

    /freelancerSubscription/{id}:
        parameters:
            - in: path
              name: id
              description: freelancer id, since a freelancer has only one subscription
              required: true
              example: 1
              schema:
                  type: integer
        get:
            tags:
                - "freelancerSubscription"
            summary: Get a freelancerSubscription by id
            description: Restricted to admins and subscription owner i,e the freelancer
            operationId: getfreelancerSubscriptionByID
            security:
                - bearerAuth: []
            responses:
                "200":
                    $ref: "#/components/responses/FreelancerSubscriptionResponse"
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        patch:
            tags:
                - "freelancerSubscription"
            summary: Update a freelancerSubscription
            description: Another edge case where manual updating of subscription can be done, if something goes wrong in the backend side
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                freelancer_id:
                                    type: integer
                                    example: 1
                                expiry_date:
                                    type: string
                                    example: "2020-05-08T03:11:21.553Z"
                            required:
                                - freelancer_id
                                - expiry_date

            responses:
                "200":
                    $ref: "#/components/responses/FreelancerSubscriptionResponse"
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        delete:
            tags:
                - "freelancerSubscription"
            summary: Delete a freelancer subscription
            description: Admin users can delete any freelancers subscription.Beats me why we need it now
            operationId: deletefreelancerSubscription
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: freelancerSubscription deleted successfully
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /job:
        get:
            tags:
                - "job"
            parameters:
                - in: query
                  name: queryparams
                  schema:
                      type: object
                      properties:
                          industry:
                              type: integer
                              example: 1
                          limit:
                              type: integer
                              example: 20
                          nextPage:
                              type: string
                              example: "KGRhdGUpMjAyMS0wMi0wM1QyMDozMjo0MC43NTda"
                  style: form
                  explode: true

            summary: Get a list of all jobs with multiple combinations
            description: Open to all users. Has pagination and can accept query params for rich data querying. By default the endpoint will get all jobs with with a limit of 10 , to fetch a single industry use it as a query param
            security:
                - bearerAuth: []
            operationId: getalljobs
            responses:
                "200":
                    description: An object containing the results and the pagInfo obj for cursor pagination
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    results:
                                        type: array
                                        items:
                                            type: object
                                            properties:
                                                id:
                                                    type: integer
                                                    example: 1
                                                title:
                                                    type: string
                                                    example: "python developer wanted"
                                                description:
                                                    type: string
                                                    example: "looking for a seasoned python developer"
                                                industry_id:
                                                    type: integer
                                                    example: 1
                                                hiring_manager_id:
                                                    type: number
                                                    example: 1
                                                main_skill:
                                                    type: string
                                                    example: "python"
                                                latitude:
                                                    type: number
                                                    example: 38.676
                                                longitude:
                                                    type: number
                                                    example: -1.566
                                                job_status_id:
                                                    type: integer
                                                    example: 1
                                                budget_range_min:
                                                    type: integer
                                                    example: 25000
                                                budget_range_max:
                                                    type: integer
                                                    example: 50000
                                                created_at:
                                                    type: string
                                                    example: "2020-05-05T09:12:57.848Z"
                                                start_date:
                                                    type: string
                                                    example: "2020-05-08T03:11:21.553Z"
                                                end_date:
                                                    type: string
                                                    example: "2020-05-08T03:11:21.553Z"
                                    pageInfo:
                                        type: object
                                        properties:
                                            total:
                                                type: integer
                                                example: 30
                                            remaining:
                                                type: integer
                                                example: 20
                                            hasMore:
                                                type: boolean
                                                example: true
                                            hasPrevious:
                                                type: boolean
                                                example: true
                                            hasNext:
                                                type: boolean
                                                example: true
                                            next:
                                                type: string
                                                example: "KGRhdGUpMjAyMS0wMi0wNFQwMDo1ODoyOS4xODNa"
                                            previous:
                                                type: string
                                                example: "KGRhdGUpMjAyMS0wMi0wNFQwMDo1ODoyOS4xODNat"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"
                "404":
                    $ref: "#/components/responses/NotFoundError"

        post:
            tags:
                - "job"
            summary: Post a job
            operationId: postajob
            description: Restricted to users.
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                title:
                                    type: string
                                    example: "js developer"
                                description:
                                    type: string
                                    example: "a super js developer"
                                industry_id:
                                    type: integer
                                    example: 1
                                latitude:
                                    type: number
                                    example: 36.78678678
                                longitude:
                                    type: number
                                    example: -1.546567
                                start_date:
                                    type: string
                                    example: "2020-05-08T03:11:21.553Z"
                                end_date:
                                    type: string
                                    example: "2020-05-08T03:11:21.553Z"
                                budget_range_min:
                                    type: integer
                                    example: 25000
                                budget_range_max:
                                    type: integer
                                    example: 50000
                                text_data:
                                    type: string
                                    example: "super js developer wanted in nairobi"
                                quill_data:
                                    type: object
                                    
                                    
                            required:
                                - industry_id
                                - title
                                - description
                                - start_date
                                - end_date
                                - latitude
                                - longitude

            responses:
                "200":
                    description: job  was correctly inserted
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    title:
                                        type: string
                                        example: "js developer"
                                    description:
                                        type: string
                                        example: "a super js developer"
                                    industry_id:
                                        type: integer
                                        example: 1
                                    main_skill:
                                        type: integer
                                        example: "javascript"
                                    latitude:
                                        type: number
                                        example: 36.78678678
                                    longitude:
                                        type: number
                                        example: -1.546567
                                    start_date:
                                        type: string
                                        example: "2020-05-08T03:11:21.553Z"
                                    end_date:
                                        type: string
                                        example: "2020-05-08T03:11:21.553Z"
                                    budget_range_min:
                                        type: integer
                                        example: 25000
                                    budget_range_max:
                                        type: integer
                                        example: 500007
                                    text_data:
                                        type: string
                                        example: "this is an example \nThis is editable rich text, much better than a <textarea>!\nSince it's rich text, you can do things like turn a selection of text bold, or add a semantically rendered block quote in the middle of the page, like this:\n\nA wise quote.\nTry it out for yourself!\n"
                                    quill_data:
                                        type: object  
                                        example: {
                                            ops: [
                                                {
                                                    attributes: {
                                                        color: "#e60000",
                                                        bold: true,
                                                    },
                                                    insert: "this is an example ",
                                                },
                                                {
                                                    attributes: {
                                                        header: 1,
                                                    },
                                                    insert: "\n",
                                                },
                                                {
                                                    insert: "This is editable ",
                                                },
                                                {
                                                    attributes: {
                                                        bold: true,
                                                    },
                                                    insert: "rich",
                                                },
                                                {
                                                    insert: " text, ",
                                                },
                                                {
                                                    attributes: {
                                                        italic: true,
                                                    },
                                                    insert: "much",
                                                },
                                                {
                                                    insert: " better than a ",
                                                },
                                                {
                                                    attributes: {
                                                        code: true,
                                                    },
                                                    insert: "<textarea>",
                                                },
                                                {
                                                    insert: "!\nSince it's rich text, you can do things like turn a selection of text ",
                                                },
                                                {
                                                    attributes: {
                                                        bold: true,
                                                    },
                                                    insert: "bold",
                                                },
                                                {
                                                    insert: ", or add a semantically rendered block quote in the middle of the page, like this:\n\nA wise quote.",
                                                },
                                                {
                                                    attributes: {
                                                        blockquote: true,
                                                    },
                                                    insert: "\n",
                                                },
                                                {
                                                    insert: "Try it out for yourself!\n",
                                                },
                                            ],
                                        }
                "400":
                    $ref: "#/components/responses/BadRequestError"

    /job/{id}:
        parameters:
            - in: path
              name: id
              description: job id
              required: true
              example: 1
              schema:
                  type: integer
        get:
            tags:
                - "job"
            summary: Get a job  by id
            description: Open to all users
            operationId: getjobByID
            security:
                - bearerAuth: []
            responses:
                "200":
                    $ref: "#/components/responses/JobResponse"
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        patch:
            tags:
                - "job"
            summary: Update a job
            description: Freelancers can update their own job
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                title:
                                    type: string
                                    example: "java and javascript developers"
                                industry_id:
                                    type: integer
                                    example: 1
                                job_status_id:
                                    type: integer
                                    example: 2
                                latitude:
                                    type: number
                                    example: 36.78678678
                                longitude:
                                    type: number
                                    example: -1.546567
                                start_date:
                                    type: string
                                    example: "2020-05-08T03:11:21.553Z"
                                end_date:
                                    type: string
                                    example: "2020-05-08T03:11:21.553Z"
                                budget_range_min:
                                    type: integer
                                    example: 25000
                                budget_range_max:
                                    type: integer
                                    example: 50000

            responses:
                "200":
                    description: job updated successfully. The details of the job are returned
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    title:
                                        type: string
                                        example: "java and javascript developers"
                                    industry_id:
                                        type: integer
                                        example: 1
                                    job_status_id:
                                        type: integer
                                        example: 2
                                    latitude:
                                        type: number
                                        example: 36.78678678
                                    longitude:
                                        type: number
                                        example: -1.546567
                                    start_date:
                                        type: string
                                        example: "2020-05-08T03:11:21.553Z"
                                    end_date:
                                        type: string
                                        example: "2020-05-08T03:11:21.553Z"
                                    budget_range_min:
                                        type: integer
                                        example: 25000
                                    budget_range_max:
                                        type: integer
                                        example: 50000'

                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

        delete:
            tags:
                - "job"
            summary: Delete a job
            description: Admin users can delete any job, regular users are restricted.
            operationId: deletejob
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: job deleted successfully
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /proposal:
        post:
            tags:
                - "proposal"
            summary: Post a proposal aka place a bid
            operationId: post a proposal aka bid
            description: Restricted to users.
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                job_id:
                                    type: integer
                                    example: 1
                            required:
                                - job_id

            responses:
                "200":
                    description: proposal aka bid  was correctly inserted
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    job_id:
                                        type: integer
                                        example: 1
                                    freelancer_id:
                                        type: integer
                                        example: 1
                                    client_comment:
                                        type: string
                                        example: ""
                                    freelancer_comment:
                                        type: string
                                        example: ""
                                    freelancer_rating:
                                        type: integer
                                        example: 1
                                    client_rating:
                                        type: number
                                        example: 1
                                    current_proposal_status_id:
                                        type: number
                                        example: 1
                                    created_at:
                                        type: string
                                        example: "2020-05-08T03:11:21.553Z"
                                    updated_at:
                                        type: string
                                        example: "2020-05-08T03:11:21.553Z"

                "400":
                    $ref: "#/components/responses/BadRequestError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /proposal/freelancerProposals:
        get:
            tags:
                - "proposal"
            parameters:
                - in: query
                  name: queryParams
                  schema:
                      type: object
                      properties:
                          nextPage:
                              type: string
                          limit:
                              type: integer
                              example: 30
                          proposalStatus:
                              type: integer
                              example: 1
                  style: form
                  explode: true
            summary: Get all proposals aka bids for a freelancer
            description: Fetch all freelancer bids, with multiple combinations
            operationId: getproposalsByFreelancer
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: An object containing the results and the pagInfo obj for cursor pagination for the bids
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    results:
                                        type: array
                                        items:
                                            type: object
                                            properties:
                                                id:
                                                    type: integer
                                                    example: 1
                                                job_id:
                                                    type: integer
                                                    example: 1
                                                freelancer_id:
                                                    type: integer
                                                    example: 1
                                                client_comment:
                                                    type: string
                                                    example: ""
                                                freelancer_comment:
                                                    type: string
                                                    example: ""
                                                freelancer_rating:
                                                    type: integer
                                                    example: 1
                                                job:
                                                    type: object
                                                    properties:
                                                        title:
                                                            type: string
                                                            example: "js developer"
                                                        description:
                                                            type: string
                                                            example: "a super js developer"
                                                        industry_id:
                                                            type: integer
                                                            example: 1
                                                        latitude:
                                                            type: number
                                                            example: 36.78678678
                                                        longitude:
                                                            type: number
                                                            example: -1.546567
                                                        start_date:
                                                            type: string
                                                            example: "2020-05-08T03:11:21.553Z"
                                                        end_date:
                                                            type: string
                                                            example: "2020-05-08T03:11:21.553Z"
                                                        budget_range_min:
                                                            type: integer
                                                            example: 25000
                                                        budget_range_max:
                                                            type: integer
                                                            example: 50000
                                                client_rating:
                                                    type: number
                                                    example: 1
                                                current_proposal_status_id:
                                                    type: number
                                                    example: 1
                                                created_at:
                                                    type: string
                                                    example: "2020-05-08T03:11:21.553Z"
                                                updated_at:
                                                    type: string
                                                    example: "2020-05-08T03:11:21.553Z"
                                    pageInfo:
                                        type: object
                                        properties:
                                            total:
                                                type: integer
                                                example: 30
                                            remaining:
                                                type: integer
                                                example: 20
                                            hasMore:
                                                type: boolean
                                                example: true
                                            hasPrevious:
                                                type: boolean
                                                example: true
                                            hasNext:
                                                type: boolean
                                                example: true
                                            next:
                                                type: string
                                                example: "KGRhdGUpMjAyMS0wMi0wNFQwMDo1ODoyOS4xODNa"
                                            previous:
                                                type: string
                                                example: "KGRhdGUpMjAyMS0wMi0wNFQwMDo1ODoyOS4xODNat"
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /proposal/jobProposals/{job_id}:
        get:
            tags:
                - "proposal"
            parameters:
                - in: path
                  name: job_id
                  description: job id
                  required: true
                  example: 1
                  schema:
                      type: integer
                - in: query
                  name: queryParams
                  schema:
                      type: object
                      properties:
                          nextPage:
                              type: string
                          limit:
                              type: integer
                              example: 30
                          proposalStatus:
                              type: integer
                              example: 1
                  style: form
                  explode: true
            summary: Get all  job proposals aka bids for a given job
            description: Fetch all bids for a given job, with multiple combinations
            operationId: getjobproposals
            security:
                - bearerAuth: []

            responses:
                "200":
                    description: An object containing the results and the pagInfo obj for cursor pagination for the bids
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    results:
                                        type: array
                                        items:
                                            type: object
                                            properties:
                                                id:
                                                    type: integer
                                                    example: 1
                                                job_id:
                                                    type: integer
                                                    example: 1
                                                freelancer_id:
                                                    type: integer
                                                    example: 1
                                                client_comment:
                                                    type: string
                                                    example: ""
                                                freelancer_comment:
                                                    type: string
                                                    example: ""
                                                freelancer_rating:
                                                    type: integer
                                                    example: 1
                                                client_rating:
                                                    type: number
                                                    example: 1
                                                current_proposal_status_id:
                                                    type: number
                                                    example: 1
                                                created_at:
                                                    type: string
                                                    example: "2020-05-08T03:11:21.553Z"
                                                updated_at:
                                                    type: string
                                                    example: "2020-05-08T03:11:21.553Z"
                                    pageInfo:
                                        type: object
                                        properties:
                                            total:
                                                type: integer
                                                example: 30
                                            remaining:
                                                type: integer
                                                example: 20
                                            hasMore:
                                                type: boolean
                                                example: true
                                            hasPrevious:
                                                type: boolean
                                                example: true
                                            hasNext:
                                                type: boolean
                                                example: true
                                            next:
                                                type: string
                                                example: "KGRhdGUpMjAyMS0wMi0wNFQwMDo1ODoyOS4xODNa"
                                            previous:
                                                type: string
                                                example: "KGRhdGUpMjAyMS0wMi0wNFQwMDo1ODoyOS4xODNat"
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"
    /proposal/jobProposalsStats/{job_id}:
        get:
            tags:
                - "proposal"
            parameters:
                - in: path
                  name: job_id
                  description: job id
                  required: true
                  example: 1
                  schema:
                      type: integer
                
            summary: Get all  job proposals stats for a given job
            description: Fetch all stats for a given job
            operationId: getjobproposalsStats
            security:
                - bearerAuth: []
            responses:
              "200":
                description: Returns an array containing current proposal status and count, if none is found it returns an empty array, so always validate the length
                content:
                  application/json:
                    schema:
                      type: array
                      items:
                        type: object
                        properties:
                          Applicants:
                            type: string
                            example: 1
                          Accepted:
                            type: string
                            example: 1
                          InReview:
                            type: string
                            example: 0
                            
                    
                
    /proposal/{id}/freelancerFeedback:
        patch:
            tags:
                - "proposal"
            parameters:
                - in: path
                  name: id
                  description: proposal aka bid id
                  required: true
                  example: 1
                  schema:
                      type: integer
            summary: send a feedback or rating for a job
            operationId: freelancerfeedback
            description: Freelancers can submit a feeback after a job is completed
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                freelancer_comment:
                                    type: string
                                    example: "very bad employer, scam"
                                job_id:
                                    type: integer
                                    example: 1
                                freelancer_rating:
                                    type: integer
                                    example: 1
                            required:
                                - job_id

            responses:
                "200":
                    description: feedback submitted successfully. The details of the feedback are returned
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    job_id:
                                        type: integer
                                        example: 1
                                    freelancer_id:
                                        type: integer
                                        example: 1
                                    client_comment:
                                        type: string
                                        example: ""
                                    freelancer_comment:
                                        type: string
                                        example: ""
                                    freelancer_rating:
                                        type: integer
                                        example: 1
                                    client_rating:
                                        type: number
                                        example: 1
                                    current_proposal_status_id:
                                        type: number
                                        example: 1
                                    created_at:
                                        type: string
                                        example: "2020-05-08T03:11:21.553Z"
                                    updated_at:
                                        type: string
                                        example: "2020-05-08T03:11:21.553Z"

                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /proposal/{id}/clientFeedback/{job_id}:
        post:
            tags:
                - "proposal"
            parameters:
                - in: path
                  name: id
                  description: proposal aka bid id
                  required: true
                  example: 1
                  schema:
                      type: integer
                - in: path
                  name: job_id
                  description: job id
                  required: true
                  example: 1
                  schema:
                      type: integer

            summary: send a feedback or rating for a job
            operationId: clientfeedback
            description: Freelancers can submit a feeback after a job is completed
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                client_comment:
                                    type: string
                                    example: "very bad developer, scam"
                                client_rating:
                                    type: integer
                                    example: 1

            responses:
                "200":
                    description: feedback submitted successfully. The details of the feedback are returned
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    job_id:
                                        type: integer
                                        example: 1
                                    freelancer_id:
                                        type: integer
                                        example: 1
                                    client_comment:
                                        type: string
                                        example: "very bad developer, scam"
                                    freelancer_comment:
                                        type: string
                                        example: ""
                                    freelancer_rating:
                                        type: integer
                                        example: 1
                                    client_rating:
                                        type: number
                                        example: 1
                                    current_proposal_status_id:
                                        type: number
                                        example: 1
                                    created_at:
                                        type: string
                                        example: "2020-05-08T03:11:21.553Z"
                                    updated_at:
                                        type: string
                                        example: "2020-05-08T03:11:21.553Z"

                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /proposal/{id}/withdrawProposal:
        delete:
            tags:
                - "proposal"
            parameters:
                - in: path
                  name: id
                  description: proposal aka bid id
                  required: true
                  example: 1
                  schema:
                      type: integer
            summary: withdraw a job proposal
            description: Freelancers can withdraw a bid
            operationId: withdrawjobproposal
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: proposal deleted successfully
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /proposal/bulkRejectProposals:
        post:
            tags:
                - "proposal"
            summary: delete multiple job proposals
            description: Hiring Manager can delete multiple proposals at once
            operationId: bulkDeleteProposals
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                ids:
                                    type: array
                                    items:
                                        type: integer
                                        example: 1

            responses:
                "200":
                    description: proposals deleted successfully
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    ids:
                                        type: array
                                        items:
                                            type: integer
                                            example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"
    /proposal/{id}/rejectProposal/{job_id}:
        delete:
            tags:
                - "proposal"
            parameters:
                - in: path
                  name: id
                  description: proposal aka bid id
                  required: true
                  example: 1
                  schema:
                      type: integer
                - in: path
                  name: job_id
                  description: job id
                  required: true
                  example: 1
                  schema:
                      type: integer
            summary: rejecet a job proposal by hring manager
            description: Hiring Manager users can reject a proposal aka bid
            operationId: rejectjobproposal
            security:
                - bearerAuth: []

            responses:
                "200":
                    description: proposal deleted successfully
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

    /company:
        post:
            tags:
                - "company"
            summary: Create a company
            description: Restricted to  owners
            operationId: createcompany
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                name:
                                    type: string
                                    example: "massive dynamic"
                                description:
                                    type: string
                                    example: "we create everything"
                                logo_url:
                                    type: string
                                    example: "https://storagebucket.gogle.com/massivedy"
                                website_url:
                                    type: string
                                    example: "https://some.massivedynamics.com"
                                email:
                                    type: string
                                    example: "massive.dynamics@info.com"
                            required:
                                - name
                                - description
                                - email
            responses:
                "200":
                    description: Company created successfully, detail of the company are returned
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    name:
                                        type: string
                                        example: "massive dynamic"
                                    description:
                                        type: string
                                        example: "we create everything"
                                    logo_url:
                                        type: string
                                        example: "https://storagebucket.gogle.com/massivedy"
                                    owner_id:
                                        type: integer
                                        example: 1
                                    email:
                                        type: string
                                        example: "massive.dynamics@info.com"
                                    active:
                                        type: boolean
                                        example: true
                "500":
                    description: Company name already exists
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    message:
                                        type: string
                                        example: "Name Massive dynamic is already registered"

        get:
            tags:
                - "company"
            parameters:
                - in: query
                  name: queryparams
                  schema:
                      type: object
                      properties:
                          limit:
                              type: integer
                              example: 20
                          nextPage:
                              type: string
                              example: ""
            summary: Get all companies
            description: Restricted to admin accounts
            operationId: getallcompanies
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: An array of objects containing company infos
                    content:
                        application/json:
                            schema:
                                type: array
                                items:
                                    type: object
                                    properties:
                                        results:
                                            type: array
                                            items:
                                                type: object
                                                properties:
                                                    id:
                                                        type: integer
                                                        example: 1
                                                    name:
                                                        type: string
                                                        example: "massive dynamic"
                                                    description:
                                                        type: string
                                                        example: "we create everything"
                                                    logo_url:
                                                        type: string
                                                        example: "https://storagebucket.gogle.com/massivedy"
                                                    owner_id:
                                                        type: integer
                                                        example: 1
                                                    email:
                                                        type: string
                                                        example: "massive.dynamics@info.com"
                                                    owner:
                                                        type: object
                                                        properties:
                                                            id:
                                                                type: integer
                                                                example: 1
                                                            first_name:
                                                                type: string
                                                                example: "sunday"
                                                            last_name:
                                                                type: string
                                                                example: "oliseh"
                                                            email:
                                                                type: string
                                                                example: "sunday@oliseh.com"
                                                            role:
                                                                type: string
                                                                example: "user"
                                                            phone_number:
                                                                type: string
                                                                example: "0714382366"
                                                            active:
                                                                type: boolean
                                                                example: true
                                                            created_at:
                                                                type: string
                                                                example: "2020-05-05T09:12:57.848Z"
                                                            updated_at:
                                                                type: string
                                                                example: "2020-05-05T09:12:57.848Z"
                                        pageInfo:
                                            type: object
                                            properties:
                                                total:
                                                    type: integer
                                                    example: 30
                                                remaining:
                                                    type: integer
                                                    example: 20
                                                hasMore:
                                                    type: boolean
                                                    example: true
                                                hasPrevious:
                                                    type: boolean
                                                    example: true
                                                hasNext:
                                                    type: boolean
                                                    example: true
                                                next:
                                                    type: string
                                                    example: "KGRhdGUpMjAyMS0wMi0wNFQwMDo1ODoyOS4xODNa"
                                                previous:
                                                    type: string
                                                    example: "KGRhdGUpMjAyMS0wMi0wNFQwMDo1ODoyOS4xODNat"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"
                "403":
                    $ref: "#/components/responses/UnauthorizedError"
                "404":
                    $ref: "#/components/responses/NotFoundError"
                    
    /company/mine:

        get:
            tags:
                - "company"
            summary: Get myCompany 
            description: Open to all users
            operationId: getmycompany
            security:
                - bearerAuth: []
            responses:
                "200":
                    $ref: "#/components/responses/CompanyResponse"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"
                "404":
                    $ref: "#/components/responses/NotFoundError"                

    /company/{id}:
        parameters:
            - in: path
              name: id
              description: Company ID
              required: true
              example: 1
              schema:
                  type: integer

        get:
            tags:
                - "company"
            summary: Get Company by its ID
            description: Open to all users
            operationId: getcompanybyid
            security:
                - bearerAuth: []
            responses:
                "200":
                    $ref: "#/components/responses/CompanyResponse"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"
                "404":
                    $ref: "#/components/responses/NotFoundError"

        patch:
            tags:
                - "company"
            summary: Update a Company
            description: Restricted to owners and admin
            operationId: updatecompany
            security:
                - bearerAuth: []
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                name:
                                    type: string
                                    example: "massive dynamic"
                                description:
                                    type: string
                                    example: "we create everything"
                                logo_url:
                                    type: string
                                    example: "https://storagebucket.gogle.com/massivedy"
                                email:
                                    type: string
                                    example: "massive.dynamics@info.com"
            responses:
                "200":
                    $ref: "#/components/responses/CompanyResponse"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"
                "500":
                    $ref: "#/components/responses/NameExistsError"

        delete:
            tags:
                - "company"
            summary: Delete a Company
            description: Restricted to owners and admin
            operationId: deletecompany
            security:
                - bearerAuth: []
            responses:
                "200":
                    description: Id of the delete company
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                "404":
                    $ref: "#/components/responses/NotFoundError"
                "401":
                    $ref: "#/components/responses/UnauthorizedError"

components:
    securitySchemes:
        bearerAuth:
            type: http
            scheme: bearer
            bearerFormat: JWT
    responses:
        JobResponse:
            description: Job Details
            content:
                application/json:
                    schema:
                        type: object
                        properties:
                            id:
                                type: integer
                                example: 1
                            industry:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    industry_name:
                                        type: string
                                        example: "Programming"
                            hiringManager:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    user_id:
                                        type: string
                                        example: 2
                            jobStatus:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    job_status_name:
                                        example: "accepting bids"
                                        type: string
                            main_skill:
                                type: integer
                                example: "javascript"
                            latitude:
                                type: number
                                example: 36.78678678
                            longitude:
                                type: number
                                example: -1.546567
                            start_date:
                                type: string
                                example: "2020-05-08T03:11:21.553Z"
                            end_date:
                                type: string
                                example: "2020-05-08T03:11:21.553Z"
                            budget_range_min:
                                type: integer
                                example: 25000
                            budget_range_max:
                                type: integer
                                example: 50000

        FreelancerSubscriptionResponse:
            description: freelancer freelancerSubscription was correctly inserted and expiry_date set
            content:
                application/json:
                    schema:
                        type: object
                        properties:
                            freelancer_id:
                                type: integer
                                example: 1
                            expiry_date:
                                type: string
                                example: "2020-05-08T03:11:21.553Z"

        FreelancerResponse:
            description: Freelancer Details
            content:
                application/json:
                    schema:
                        type: object
                        properties:
                            id:
                                type: integer
                                example: 1
                            description:
                                type: string
                                example: "Owner"
                            user_id:
                                type: integer
                                example: 1
                            industry_id:
                                type: integer
                                example: 1
                            hiring_manager_id:
                                type: integer
                                example: 1
                            latitude:
                                type: number
                                example: 38.676
                            longitude:
                                type: number
                                example: -1.566
                            created_at:
                                type: string
                                example: "2020-05-05T09:12:57.848Z"
                            updated_at:
                                type: string
                            industry:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    industry_name:
                                        type: string
                                        example: "Computer Programming"
                            skills:
                                type: array
                                items:
                                    type: object
                                    properties:
                                        id:
                                            type: integer
                                            example: 1
                                        skill_name:
                                            type: integer
                                            example: "Python"
                            user:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    first_name:
                                        type: string
                                        example: "sunday"
                                    last_name:
                                        type: string
                                        example: "brina"
                                    email:
                                        type: string
                                        example: "brians931@gmail.com"
                                    phone_number:
                                        type: string
                                        example: "0714382344"
                                    active:
                                        type: boolean
                                        example: true
                                    isVerified:
                                        type: boolean
                                        example: false
                                    image_url:
                                        type: string
                                        example: "https://firebase.com/jhdfkdshfjkfs,.jpeg"
                                    created_at:
                                        type: string
                                        example: "2021-02-11T10:14:54.742Z"
                                    updated_at:
                                        type: string
                                        example: "2021-02-11T10:14:54.742Z"

        FreelancerSkillsResponse:
            description: Freelancer Skills
            content:
                application/json:
                    schema:
                        type: array
                        items:
                            type: object
                            properties:
                                skill_name:
                                    type: string
                                    example: "Plumbing"
                                id:
                                    type: integer
                                    example: 1
                                freelancer_id:
                                    type: integer
                                    example: 1

        CompanyResponse:
            description: Company Details
            content:
                application/json:
                    schema:
                        type: object
                        properties:
                            id:
                                type: integer
                                example: 1
                            name:
                                type: string
                                example: "massive dynamic"
                            description:
                                type: string
                                example: "we create everything"
                            logo_url:
                                type: string
                                example: "https://storagebucket.gogle.com/massivedy"
                            owner_id:
                                type: integer
                                example: 1
                            email:
                                type: string
                                example: "massive.dynamics@info.com"
                            owner:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        example: 1
                                    first_name:
                                        type: string
                                        example: "sunday"
                                    last_name:
                                        type: string
                                        example: "oliseh"
                                    email:
                                        type: string
                                        example: "sunday@oliseh.com"
                                    role:
                                        type: string
                                        example: "user"
                                    phone_number:
                                        type: string
                                        example: "0714382366"
                                    active:
                                        type: boolean
                                        example: true
                                    created_at:
                                        type: string
                                        example: "2020-05-05T09:12:57.848Z"
                                    updated_at:
                                        type: string
                                        example: "2020-05-05T09:12:57.848Z"

        HiringManagerResponse:
            description: HiringManager Details
            content:
                application/json:
                    schema:
                        type: object
                        properties:
                            id:
                                type: integer
                                example: 1
                            first_name:
                                type: string
                                example: "Sunday"
                            last_name:
                                type: string
                                example: "Owner"
                            latitude:
                                type: number
                                example: 38.676
                            longitude:
                                type: number
                                example: -1.566
                            email:
                                type: string
                                example: "sunday@owner.com"
                            phone_number:
                                type: string
                                example: "0714382366"
                            created_at:
                                type: string
                                example: "2020-05-05T09:12:57.848Z"
                            updated_at:
                                type: string
                                example: "2020-05-08T03:11:21.553Z"

        UnauthorizedError:
            description: Access token is missing or invalid, or the user does not have access to perform the action
            content:
                application/json:
                    schema:
                        type: object
                        properties:
                            message:
                                type: string
                                example: "Unauthorized"
        NotFoundError:
            description: Not Found
            content:
                application/json:
                    schema:
                        type: object
                        properties:
                            message:
                                type: string
                                example: "Not Found"
        AccessDenied:
            description: Access Denied
            content:
                application/json:
                    schema:
                        type: object
                        properties:
                            message:
                                type: string
                                example: "Token not found, access denied"
        NameExistsError:
            description: Name is already in use
            content:
                application/json:
                    schema:
                        type: object
                        properties:
                            message:
                                type: string
                                example: "Name is already taken"
        BadRequestError:
            description: Validation of required fields failed
            content:
                application/json:
                    schema:
                        type: object
                        properties:
                            message:
                                type: string
                                example: "Validation Error some values is required"
