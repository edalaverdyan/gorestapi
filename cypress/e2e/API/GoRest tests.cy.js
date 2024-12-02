

describe('Gorest API Tests', () => {
    let token = '055c7cb58c04d61af3aaaf4919651b6aa8a4a785225baf04ad574220fb663c9b';
    let userId;
    const userName = "Edgar";
    const userEmail = "ed.alaverdyan@gmail.com";
    const updatedName = "Ed";
    const updatedEmail = "ed.alaverdyan1@gmail.com";

    it('Create User', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: {
                "name": userName,
                "gender": "male",
                "email": userEmail,
                "status": "active"
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('name', userName);
            expect(response.body).to.have.property('email', userEmail);

            userId = response.body.id;
        });
    });

    it('Get User', () => {
        cy.request({
            method: 'GET',
            url: `https://gorest.co.in/public/v2/users/${userId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', userName);
            expect(response.body).to.have.property('email', userEmail);
        });
    });

    it('Update User', () => {
        cy.request({
            method: 'PATCH',
            url: `https://gorest.co.in/public/v2/users/${userId}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: {
                "name": updatedName,
                "email": updatedEmail,
                "status": "active"
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', updatedName);
            expect(response.body).to.have.property('email', updatedEmail);
        });


        cy.request({
            method: 'GET',
            url: `https://gorest.co.in/public/v2/users/${userId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', updatedName);
            expect(response.body).to.have.property('email', updatedEmail);
        });
    });

    it('Delete User', () => {
        cy.request({
            method: 'DELETE',
            url: `https://gorest.co.in/public/v2/users/${userId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(204);
        });


        cy.request({
            method: 'GET',
            url: `https://gorest.co.in/public/v2/users/${userId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
});
