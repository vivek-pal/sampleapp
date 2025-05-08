
export const buildExecutePaymentRequest = (request) => {
    let payload = {
        "userid": request.userid,
        "pnr": request.pnr,
        "token": request.token
    }
    return payload;
}