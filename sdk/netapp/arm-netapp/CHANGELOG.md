# Release History

## 17.0.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 17.0.1 (2023-02-01)
    
**Features**

  - Exposes `getContinuationToken` helper function to extract continuation token

**Bugs Fixed**

  - A series of small bug fixs relevant to authentication and apiVersion policy
    
## 17.0.0 (2022-09-21)
    
**Features**

  - Added operation Accounts.beginRenewCredentials
  - Added operation Accounts.beginRenewCredentialsAndWait
  - Added operation NetAppResource.queryRegionInfo
  - Added Interface AccountsRenewCredentialsOptionalParams
  - Added Interface EncryptionIdentity
  - Added Interface Identity
  - Added Interface KeyVaultProperties
  - Added Interface NetAppResourceQueryRegionInfoOptionalParams
  - Added Interface RegionInfo
  - Added Interface RegionInfoAvailabilityZoneMappingsItem
  - Added Interface RelocateVolumeRequest
  - Added Interface UserAssignedIdentity
  - Added Type Alias IdentityType
  - Added Type Alias KeySource
  - Added Type Alias KeyVaultStatus
  - Added Type Alias NetAppResourceQueryRegionInfoResponse
  - Added Type Alias RegionStorageToNetworkProximity
  - Added Type Alias SmbAccessBasedEnumeration
  - Added Type Alias SmbNonBrowsable
  - Interface AccountEncryption has a new optional parameter identity
  - Interface AccountEncryption has a new optional parameter keyVaultProperties
  - Interface NetAppAccount has a new optional parameter disableShowmount
  - Interface NetAppAccount has a new optional parameter identity
  - Interface NetAppAccountPatch has a new optional parameter disableShowmount
  - Interface Volume has a new optional parameter deleteBaseSnapshot
  - Interface Volume has a new optional parameter smbAccessBasedEnumeration
  - Interface Volume has a new optional parameter smbNonBrowsable
  - Interface VolumeGroupVolumeProperties has a new optional parameter deleteBaseSnapshot
  - Interface VolumeGroupVolumeProperties has a new optional parameter smbAccessBasedEnumeration
  - Interface VolumeGroupVolumeProperties has a new optional parameter smbNonBrowsable
  - Interface VolumesRelocateOptionalParams has a new optional parameter body
  - Added Enum KnownIdentityType
  - Added Enum KnownKeySource
  - Added Enum KnownKeyVaultStatus
  - Added Enum KnownRegionStorageToNetworkProximity
  - Added Enum KnownSmbAccessBasedEnumeration
  - Added Enum KnownSmbNonBrowsable

**Breaking Changes**

  - Interface Vault no longer has parameter location
    
    
## 16.1.0 (2022-07-21)
    
**Features**

  - Added operation Volumes.beginReestablishReplication
  - Added operation Volumes.beginReestablishReplicationAndWait
  - Added Interface BackupPolicy
  - Added Interface CapacityPool
  - Added Interface NetAppAccount
  - Added Interface ProxyResource
  - Added Interface ReestablishReplicationRequest
  - Added Interface SnapshotPolicy
  - Added Interface SubscriptionQuotaItem
  - Added Interface SubvolumeInfo
  - Added Interface TrackedResource
  - Added Interface Volume
  - Added Interface VolumeQuotaRule
  - Added Interface VolumesReestablishReplicationOptionalParams
  - Interface CapacityPoolPatch has a new optional parameter coolAccess
  - Interface VolumeGroupVolumeProperties has a new optional parameter keyVaultPrivateEndpointResourceId
  - Interface VolumePatch has a new optional parameter coolAccess
  - Interface VolumePatch has a new optional parameter coolnessPeriod
  - Enum KnownEncryptionKeySource has a new value MicrosoftKeyVault
    
    
## 16.0.0 (2022-06-13)
    
**Features**

  - Added operation group VolumeQuotaRules
  - Added operation Volumes.beginFinalizeRelocation
  - Added operation Volumes.beginFinalizeRelocationAndWait
  - Added operation Volumes.beginRelocate
  - Added operation Volumes.beginRelocateAndWait
  - Added operation Volumes.beginResetCifsPassword
  - Added operation Volumes.beginResetCifsPasswordAndWait
  - Added operation Volumes.beginRevertRelocation
  - Added operation Volumes.beginRevertRelocationAndWait
  - Added operation Volumes.listReplications
  - Added Interface ListReplications
  - Added Interface Replication
  - Added Interface VolumeQuotaRulePatch
  - Added Interface VolumeQuotaRulesCreateOptionalParams
  - Added Interface VolumeQuotaRulesDeleteOptionalParams
  - Added Interface VolumeQuotaRulesGetOptionalParams
  - Added Interface VolumeQuotaRulesList
  - Added Interface VolumeQuotaRulesListByVolumeOptionalParams
  - Added Interface VolumeQuotaRulesUpdateOptionalParams
  - Added Interface VolumeRelocationProperties
  - Added Interface VolumesFinalizeRelocationOptionalParams
  - Added Interface VolumesListReplicationsOptionalParams
  - Added Interface VolumesRelocateOptionalParams
  - Added Interface VolumesResetCifsPasswordOptionalParams
  - Added Interface VolumesRevertRelocationOptionalParams
  - Added Type Alias BackupPolicy
  - Added Type Alias CapacityPool
  - Added Type Alias EncryptionKeySource
  - Added Type Alias NetAppAccount
  - Added Type Alias ProvisioningState
  - Added Type Alias SnapshotPolicy
  - Added Type Alias TrackedResource
  - Added Type Alias Type
  - Added Type Alias Volume
  - Added Type Alias VolumeQuotaRule
  - Added Type Alias VolumeQuotaRulesCreateResponse
  - Added Type Alias VolumeQuotaRulesGetResponse
  - Added Type Alias VolumeQuotaRulesListByVolumeResponse
  - Added Type Alias VolumeQuotaRulesUpdateResponse
  - Added Type Alias VolumesListReplicationsResponse
  - Interface Resource has a new optional parameter systemData
  - Interface VolumeGroupVolumeProperties has a new optional parameter encrypted
  - Class NetAppManagementClient has a new parameter volumeQuotaRules
  - Added Enum KnownEncryptionKeySource
  - Added Enum KnownType

**Breaking Changes**

  - Interface VolumeGroup no longer has parameter tags
  - Interface VolumeGroupDetails no longer has parameter tags
  - Type Alias SubscriptionQuotaItem no longer has parameter systemData
  - Type Alias SubvolumeInfo no longer has parameter systemData
    
## 15.1.1 (2022-04-27)

**Features**

  - Bug fix

## 15.1.0 (2022-03-02)
    
**Features**

  - Added operation group Subvolumes
  - Added operation Snapshots.beginRestoreFiles
  - Added operation Snapshots.beginRestoreFilesAndWait
  - Added Interface LdapSearchScopeOpt
  - Added Interface SnapshotRestoreFiles
  - Added Interface SnapshotsRestoreFilesOptionalParams
  - Added Interface SubvolumeModel
  - Added Interface SubvolumePatchRequest
  - Added Interface SubvolumesCreateOptionalParams
  - Added Interface SubvolumesDeleteOptionalParams
  - Added Interface SubvolumesGetMetadataOptionalParams
  - Added Interface SubvolumesGetOptionalParams
  - Added Interface SubvolumesList
  - Added Interface SubvolumesListByVolumeNextOptionalParams
  - Added Interface SubvolumesListByVolumeOptionalParams
  - Added Interface SubvolumesUpdateOptionalParams
  - Added Type Alias EnableSubvolumes
  - Added Type Alias SubvolumeInfo
  - Added Type Alias SubvolumesCreateResponse
  - Added Type Alias SubvolumesGetMetadataResponse
  - Added Type Alias SubvolumesGetResponse
  - Added Type Alias SubvolumesListByVolumeNextResponse
  - Added Type Alias SubvolumesListByVolumeResponse
  - Added Type Alias SubvolumesUpdateResponse
  - Interface ActiveDirectory has a new optional parameter ldapSearchScope
  - Interface BackupPolicy has a new optional parameter systemData
  - Interface CapacityPool has a new optional parameter systemData
  - Interface SnapshotPolicy has a new optional parameter systemData
  - Interface Volume has a new optional parameter enableSubvolumes
  - Interface Volume has a new optional parameter maximumNumberOfFiles
  - Interface Volume has a new optional parameter systemData
  - Interface VolumeGroupVolumeProperties has a new optional parameter enableSubvolumes
  - Interface VolumeGroupVolumeProperties has a new optional parameter maximumNumberOfFiles
  - Interface VolumePatch has a new optional parameter unixPermissions
  - Interface VolumesDeleteOptionalParams has a new optional parameter forceDelete
  - Class NetAppManagementClient has a new parameter subvolumes
  - Added Enum KnownEnableSubvolumes
    
    
## 15.0.0 (2022-01-20)

The package of @azure/arm-netapp is using our next generation design principles since version 15.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
