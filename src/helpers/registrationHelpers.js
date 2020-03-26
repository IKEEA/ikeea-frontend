export const getEmailFromToken = async (token) => {
    // TO DO 
    // Implement server-side fetching of the email
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({value: "test@email.com"});
        }, 500)
    })
}