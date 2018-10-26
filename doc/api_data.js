define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "name": "Login_using_local_strategy",
    "group": "Authentication",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "String",
            "description": "<p>Json Web Token for use with Authorization/Bearer header.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/authRoutes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/forgot",
    "title": "Forgot Password",
    "name": "Remind_users_password",
    "group": "Authentication",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>of registered user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/authRoutes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/signup",
    "title": "Register",
    "name": "Signup_new_user_with_local_strategy",
    "group": "Authentication",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>user object.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl --data-urlencode \"email=test@test.com&username=test&password=testpassword&firstName=John&lastName=Mustermann&address=Brahmsstrasse 3 11111 Berlin&birthday=06.10.1987&status=guest\"",
        "type": "curl"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SignupsOff",
            "description": "<p>Club has deactivated registration.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/authRoutes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/api/teams/:id/add",
    "title": "Add member",
    "name": "Add_member_to_the_team",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Teams unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Team",
            "optional": false,
            "field": "JSON",
            "description": "<p>object containing team data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/teamRoutes.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/api/teams",
    "title": "All teams",
    "name": "Get_list_of_all_teams",
    "group": "Teams",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "array",
            "description": "<p>of team id's.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/teamRoutes.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/api/teams/:id",
    "title": "Team data",
    "name": "Get_team_data",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Teams unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Team",
            "optional": false,
            "field": "JSON",
            "description": "<p>object containing team data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/teamRoutes.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "",
    "name": "Create_user",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "JSON",
            "description": "<p>object containing user data.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "[\n     {\n        \"email\": 'test@test.com',\n        \"username\": 'testUser',\n        \"password\": \"testpassword\",\n        \"firstName\": \"Max\",\n        \"lastName\": \"Mustermann\",\n        \"address\": \"Musterstr. 39, 44227 Dortmund\",\n        \"status\": \"member\",\n        \"emailNotifications\": true,\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete user",
    "name": "Delete_user",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "JSON",
            "description": "<p>object containing user data.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "All users",
    "name": "Get_list_of_all_users",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "array",
            "description": "<p>of user id's.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "User data",
    "name": "Get_user_data",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "JSON",
            "description": "<p>object containing user data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/:id",
    "title": "Update user",
    "name": "Update_user_data",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "JSON",
            "description": "<p>object containing user data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/userRoutes.js",
    "groupTitle": "Users"
  }
] });
