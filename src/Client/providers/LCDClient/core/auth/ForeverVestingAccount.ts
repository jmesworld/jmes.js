import { JSONSerializable } from '../../util/json';
import { BaseVestingAccount } from './BaseVestingAccount';
import * as Long from 'long';
import { PublicKey } from '../PublicKey';

import { BaseVestingAccount as BaseVestingAccount_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting';
import { ForeverVestingAccount as ForeverVestingAccount_pb } from 'jmes.proto/cosmos/vesting/v1beta1/vesting';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

/**
 * ForeverVestingAccount implements the VestingAccount interface. It
 * continuously vests by unlocking coins linearly with respect to time.
 */
export class ForeverVestingAccount extends JSONSerializable<
  ForeverVestingAccount.Amino,
  ForeverVestingAccount.Data,
  ForeverVestingAccount.Proto
> {
  /**
   *
   * @param base_vesting_account account information
   * @param vesting_supply_percentage vesting_supply_percentage
   */
  constructor(
    public base_vesting_account: BaseVestingAccount,
    public vesting_supply_percentage: string
  ) {
    super();
  }

  public getAccountNumber(): number {
    return this.base_vesting_account.getAccountNumber();
  }

  public getSequenceNumber(): number {
    return this.base_vesting_account.getSequenceNumber();
  }

  public getPublicKey(): PublicKey | null {
    return this.base_vesting_account.base_account.public_key;
  }

  public toAmino(isClassic?: boolean): ForeverVestingAccount.Amino {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { base_vesting_account, vesting_supply_percentage } = this;
    return {
      type: 'cosmos-sdk/ForeverVestingAccount',
      value: {
        base_vesting_account: base_vesting_account.toAmino().value,
        vesting_supply_percentage:  vesting_supply_percentage,
      },
    };
  }

  public static fromAmino(
    data: ForeverVestingAccount.Amino,
    isClassic?: boolean
  ): ForeverVestingAccount {
    const base_vesting_account = BaseVestingAccount.fromAmino({
      type: 'cosmos-sdk/BaseVestingAccount',
      value: data.value.base_vesting_account,
    });
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new ForeverVestingAccount(
      base_vesting_account,
      data.value.vesting_supply_percentage
    );
  }

  public toData(isClassic?: boolean): ForeverVestingAccount.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { base_vesting_account, vesting_supply_percentage } = this;
    return {
      '@type': '/cosmos.vesting.v1beta1.ForeverVestingAccount',
      base_vesting_account: base_vesting_account.toData(),
      vesting_supply_percentage: vesting_supply_percentage.toString()
    };
  }

  public static fromData(
    data: ForeverVestingAccount.Data,
    isClassic?: boolean
  ): ForeverVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const base_vesting_account = BaseVestingAccount.fromData({
      '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount',
      ...data.base_vesting_account,
    });

    return new ForeverVestingAccount(
      base_vesting_account,
      data.vesting_supply_percentage
    );
  }

  public toProto(isClassic?: boolean): ForeverVestingAccount.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { base_vesting_account, vesting_supply_percentage } = this;

    return ForeverVestingAccount_pb.fromPartial({
      baseVestingAccount: base_vesting_account.toProto(),
    // @ts-ignore
      vesting_supply_percentage: vesting_supply_percentage,
    });
  }

  public static fromProto(
    ForeverVestingAccountProto: ForeverVestingAccount.Proto,
    isClassic?: boolean
  ): ForeverVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const baseVestingAccount = BaseVestingAccount.fromProto(
      ForeverVestingAccountProto.baseVestingAccount as BaseVestingAccount_pb
    );

    return new ForeverVestingAccount(
      baseVestingAccount,
      ForeverVestingAccountProto.vestingSupplyPercentage
    );
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/cosmos.vesting.v1beta1.ForeverVestingAccount',
      value: ForeverVestingAccount_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    pubkeyAny: Any,
    isClassic?: boolean
  ): ForeverVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return ForeverVestingAccount.fromProto(
      ForeverVestingAccount_pb.decode(pubkeyAny.value),
      isClassic
    );
  }
}

export namespace ForeverVestingAccount {
  export interface Amino {
    type: 'cosmos-sdk/ForeverVestingAccount';
    value: {
      base_vesting_account: BaseVestingAccount.AminoValue;
      vesting_supply_percentage: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.vesting.v1beta1.ForeverVestingAccount';
    base_vesting_account: BaseVestingAccount.DataValue;
    vesting_supply_percentage: string;
  }

  export type Proto = ForeverVestingAccount_pb;
}
