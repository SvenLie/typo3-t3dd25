import {expect, test} from "@playwright/test";

test('authenticate', async ({ request }) => {
    const loginPage = await request.get(`/login`);
    expect(loginPage.ok()).toBeTruthy();


    let formAction = '';
    let requestToken = '';

    (await loginPage.json()).content.colPos0.forEach((contentElement: JSON) => {
        if (contentElement.type !== 'felogin_login') {
            return;
        }

        formAction = contentElement.content.data.form.action;

        contentElement.content.data.form.elements.forEach((element: JSON) => {
            if (element.name === '__RequestToken') {
                requestToken = element.value;
            }
        })

    })

    expect(formAction).toBeTruthy();
    expect(requestToken).toBeTruthy();

    const loginPagePost = await request.post(formAction, {
        form: {
            logintype: 'login',
            user: process.env.USERNAME,
            pass: process.env.PASSWORD,
            __RequestToken: requestToken
        }
    });

    expect(loginPagePost.ok()).toBeTruthy();
    expect(await loginPagePost.json()).toMatchObject({
        content: {
            colPos0: [
                {
                    type: 'felogin_login',
                    content: {
                        data: {
                            status: 'success'
                        }
                    }
                }
            ]
        }
    })

    await request.storageState({path: process.env.USER_FILEPATH})
});
