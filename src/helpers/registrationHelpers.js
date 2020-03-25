export const getEmailFromToken = async () => {
    // TO DO 
    // Implement server-side fetching of the email
    return new Promise((resolve, reject) => {
        setTimeout(5000, () => {
            resolve("test@email.com");
        })
    })
}