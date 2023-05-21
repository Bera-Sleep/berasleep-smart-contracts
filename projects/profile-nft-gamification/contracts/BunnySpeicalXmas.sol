// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import {IBeraSleepProfile} from "./interfaces/IBeraSleepProfile.sol";
import "./BunnyMintingStation.sol";

contract BunnySpecialXmas is Ownable {
    BunnyMintingStation public immutable bunnyMintingStation;
    IBeraSleepProfile public immutable beraSleepProfile;

    uint256 public endBlock; // End of the distribution

    // BeraSleep Profile points threshold
    uint256 public beraSleepProfileThresholdPoints;

    uint8 public immutable nftId; // Nft can be minted
    string public tokenURI; // Nft token URI

    mapping(address => bool) public hasClaimed;

    event BunnyMint(address indexed to, uint256 indexed tokenId, uint8 indexed bunnyId);
    event NewEndBlock(uint256 endBlock);
    event NewBeraSleepProfileThresholdPoints(uint256 thresholdPoints);
    event NewTokenURI(string tokenURI);

    /**
     * @notice It initializes the contract.
     * @param _bunnyMintingStationAddress: BunnyMintingStation address
     * @param _beraSleepProfileAddress: BeraSleepProfile address
     * @param _beraSleepProfileThresholdPoints: User points threshold for mint NFT
     * @param _nftId: Nft can be minted
     * @param _endBlock: the end of the block
     */
    constructor(
        address _bunnyMintingStationAddress,
        address _beraSleepProfileAddress,
        uint256 _beraSleepProfileThresholdPoints,
        uint8 _nftId,
        uint256 _endBlock
    ) public {
        bunnyMintingStation = BunnyMintingStation(_bunnyMintingStationAddress);
        beraSleepProfile = IBeraSleepProfile(_beraSleepProfileAddress);
        beraSleepProfileThresholdPoints = _beraSleepProfileThresholdPoints;
        nftId = _nftId;
        endBlock = _endBlock;
    }

    /**
     * @notice Update end block for distribution
     * @dev Only callable by owner.
     */
    function updateEndBlock(uint256 _newEndBlock) external onlyOwner {
        endBlock = _newEndBlock;
        emit NewEndBlock(_newEndBlock);
    }

    /**
     * @notice Update thresholdPoints for distribution
     * @dev Only callable by owner.
     */
    function updateThresholdPoints(uint256 _newThresholdPoints) external onlyOwner {
        beraSleepProfileThresholdPoints = _newThresholdPoints;
        emit NewBeraSleepProfileThresholdPoints(_newThresholdPoints);
    }

    /**
     * @notice Update tokenURI for distribution
     * @dev Only callable by owner.
     */
    function updateTokenURI(string memory _newTokenURI) external onlyOwner {
        tokenURI = _newTokenURI;
        emit NewTokenURI(_newTokenURI);
    }

    /**
     * @notice Mint a NFT from the BunnyMintingStation contract.
     * @dev Users can claim once. It maps to the teamId.
     */
    function mintNFT() external {
        require(canClaim(msg.sender), "User: Not eligible");
        hasClaimed[msg.sender] = true;
        // Mint collectible and send it to the user.
        uint256 tokenId = bunnyMintingStation.mintCollectible(msg.sender, tokenURI, nftId);
        emit BunnyMint(msg.sender, tokenId, nftId);
    }

    /**
     * @notice Check if user can claim NFT.
     */
    function canClaim(address _userAddress) public view returns (bool) {
        (, uint256 numberUserPoints, , , , bool active) = beraSleepProfile.getUserProfile(_userAddress);
        // If user is able to mint this NFT
        if (
            !hasClaimed[_userAddress] &&
            block.number < endBlock &&
            active &&
            numberUserPoints >= beraSleepProfileThresholdPoints
        ) {
            return true;
        }
        return false;
    }
}
