import {expect, test} from "@playwright/test";

test.describe('Pages with Content Element', () => {
    test('should display the content element', async ({ request }) => {
        const cePage = await request.get(`/page-with-some-content-elements`)

        expect(cePage.ok()).toBeTruthy();
        expect(await cePage.json()).toMatchObject({
            content: {
                colPos0: [
                    {
                        type: 'header',
                        content: {
                            header: 'I\'m a heading',
                        }
                    }
                ]
            }
        })
    });

    test('should display the secret content element', async ({ request }) => {
        const cePage = await request.get(`/page-only-visible-with-login`)

        expect(cePage.ok()).toBeTruthy();
        expect(await cePage.json()).toMatchObject({
            content: {
                colPos0: [
                    {
                        type: 'header',
                        content: expect.objectContaining({
                            header: 'Very secret!',
                        })
                    }
                ]
            }
        })
    });
});