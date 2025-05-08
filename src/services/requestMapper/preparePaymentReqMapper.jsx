
export const buildPreparePaymentRequest = (request) => {
    let payload = {
        "userid": request.userid,
        "pnr": request.pnr,
        "token": request.token
    }
    return payload;
}