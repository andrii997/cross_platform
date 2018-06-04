/**
 * Created by akv on 11.08.17.
 */


function CoinNotFoundError(id) {
    this.message = "Coin with 'id' provided by you not found. 'id' = " + id;
}

function UpdateTargetNotFoundError(id) {
    this.message = "To update coin you should provide correct 'id'. Provided 'id' = " + id;
}

function CoinExistsError() {
    this.message = "Provided coin exists! We can save only  list of unique coins";
}

module.exports = {
    NotFound: CoinNotFoundError,
    UpdateNotFound: UpdateTargetNotFoundError,
    DuplicateCoin: CoinExistsError
};