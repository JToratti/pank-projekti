// When implementing new services or APIs, add a mock response for good and bad case, and a function into
// mocks hash map.
const responses = {
    getNews: {
        good: [{ headline: "Otsikko", content: "Sisältö" }],
        bad: { code: "" }
    },
    login: {
        good: [{ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IlRPS0VOIn0.DbozeWRU75tEHgFJrD4LH3iFyYZC4TL1ww1Tc0AdYWk" }],
        bad: { code: "28P01" }
    },
    getUserInfo: {
        good: [{ email: "testiteppo@gmail.com", realname: "Testiteppo Testaaja"}],
        bad: { code: ""}
    }
}

const getMockPromise = (response) => Promise.resolve(response)

// goodCase is some simple function (like () => true) that determines if with given params a good or a bad result should be returned.
const mockFactory = (response, goodCase) => (uri, params) => {
    return getMockPromise({
        ok: goodCase(uri, params) ? true : false,
        json:
            () => getMockPromise(goodCase(uri, params) ? response.good : response.bad)
    })
}

// object of mock interfaces
const mocks = {
    getUserInfo: () => mockFactory(responses.getUserInfo, (uri, params) => JSON.parse(params.body).id === 1),
    getNews: () => mockFactory(responses.getNews, (uri, params) => true),
    login: () => mockFactory(responses.login, (uri, params) => JSON.parse(params.body).email === 'testaaja@testaaja.com' )
}

export const fetchMock = (mode) => mocks[mode]()