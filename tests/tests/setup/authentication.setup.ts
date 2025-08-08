import {expect, test} from "@playwright/test";

test('authenticate', async ({ request }) => {
    const loginPagePost = await request.post(`/login`, {
        params: {
            'tx_felogin_login[action]': 'login',
            'tx_felogin_login[controller]': 'Login',
            'cHash': '263d1dc5e8dad6bfa53f4c1a90532a86'
        },
        form: {
            logintype: 'login',
            user: process.env.USERNAME,
            pass: process.env.PASSWORD,
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
