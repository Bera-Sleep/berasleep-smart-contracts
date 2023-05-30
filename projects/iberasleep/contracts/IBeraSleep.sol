// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "./interfaces/IBeraSleepPool.sol";

contract IBeraSleep is Ownable {
    using SafeMath for uint256;

    IBeraSleepPool public immutable beraSleepPool;

    address public admin;
    // threshold of locked duration
    uint256 public ceiling;

    uint256 public constant MIN_CEILING_DURATION = 1 weeks;

    event UpdateCeiling(uint256 newCeiling);

    /**
     * @notice Checks if the msg.sender is the admin address
     */
    modifier onlyAdmin() {
        require(msg.sender == admin, "None admin!");
        _;
    }

    /**
     * @notice Constructor
     * @param _beraSleepPool: BeraSleep pool contract
     * @param _admin: admin of the this contract
     * @param _ceiling: the max locked duration which the linear decrease start
     */
    constructor(
        IBeraSleepPool _beraSleepPool,
        address _admin,
        uint256 _ceiling
    ) public {
        require(_ceiling >= MIN_CEILING_DURATION, "Invalid ceiling duration");
        beraSleepPool = _beraSleepPool;
        admin = _admin;
        ceiling = _ceiling;
    }

    /**
     * @notice calculate iBeraSleep credit per user.
     * @param _user: user address.
     */
    function getUserCredit(address _user) external view returns (uint256) {
        require(_user != address(0), "getUserCredit: Invalid address");

        IBeraSleepPool.UserInfo memory userInfo = beraSleepPool.userInfo(_user);

        if (!userInfo.locked || block.timestamp > userInfo.lockEndTime) {
            return 0;
        }

        // lockEndTime always >= lockStartTime
        uint256 lockDuration = userInfo.lockEndTime.sub(userInfo.lockStartTime);

        if (lockDuration >= ceiling) {
            return userInfo.lockedAmount;
        } else if (lockDuration < ceiling && lockDuration >= 0) {
            return (userInfo.lockedAmount.mul(lockDuration)).div(ceiling);
        }
    }

    /**
     * @notice update ceiling thereshold duration for iBeraSleep calculation.
     * @param _newCeiling: new threshold duration.
     */
    function updateCeiling(uint256 _newCeiling) external onlyAdmin {
        require(_newCeiling >= MIN_CEILING_DURATION, "updateCeiling: Invalid ceiling");
        require(ceiling != _newCeiling, "updateCeiling: Ceiling not changed");
        ceiling = _newCeiling;
        emit UpdateCeiling(ceiling);
    }
}
