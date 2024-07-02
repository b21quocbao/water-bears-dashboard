import { shortenAddress } from "../../../helpers/shorten-address";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import styles from "./AccountPicker.module.css";
import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { Text } from "../text/Text";

const Account = ({
  label,
  address,
  appearanceId,
  className,
  variant = "default",
  // eslint-disable-next-line
  selected,
  onClick,
}) => (
  <div
    className={`${styles.account} ${
      styles[`appearance-id-${appearanceId}`]
    } ${className} ${styles[variant]}`}
    onClick={() => {
      if (onClick) onClick(address);
    }}
  >
    <span className={styles.label}>{label}</span>
    <span className={styles.address}>{shortenAddress(address)}</span>
  </div>
);

const Dropdown = ({ accounts, selected, onClick }) => {
  return (
    <div className={styles.dropdown}>
      {accounts.length ? (
        accounts.map((account, index, arr) => (
          <Account
            className={`${index === arr.length - 1 ? "" : "mb-05"} clickable`}
            key={account.address}
            variant="radio-button"
            selected={selected?.address === account.address}
            onClick={onClick}
            {...account}
          />
        ))
      ) : (
        <Text variant="paragraph">No accounts found</Text>
      )}
    </div>
  );
};

const Select = ({ onClick, open, selected, disabled }) => (
  <div
    className={`${styles.select} ${open ? styles.open : ""} ${
      selected ? styles["selected"] : ""
    } ${disabled ? styles["disabled"] : "clickable"}`}
    onClick={onClick}
  >
    {selected ? (
      <Account
        {...selected}
        variant="select-button"
        className={`${open ? styles.open : ""}`}
      />
    ) : (
      <span
        className={`${styles.placeholder} ${
          disabled ? styles.disabled : styles.placeholder
        }`}
      >
        {disabled ? "Connect your wallet" : "Select an account"}
      </span>
    )}
  </div>
);

const closedStyle = { opacity: 0, transform: "translateY(-10px)" };
const openStyle = { opacity: 1, transform: "translateY(0px)" };

export const AccountPicker = ({
  accounts,
  open: openControl,
  selected,
  onSelect,
  className,
}) => {
  const [open, setOpen] = useState(openControl ?? false);

  const ref = useOutsideClick(() => setOpen(false));

  const [style, api] = useSpring(() => ({
    from: closedStyle,
  }));

  const selectedAccount = accounts.find(
    (account) => account.address === selected
  );

  const openIntent = openControl !== undefined ? openControl : open;

  const disabled = accounts.length === 0;

  useEffect(() => {
    api.start({
      to: openIntent ? openStyle : closedStyle,
    });
  }, [open, openControl, openIntent, api]);

  return (
    <div
      className={`${styles["account-picker"]} ${className} header-picker`}
      ref={ref}
    >
      <Select
        open={disabled ? false : openIntent}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        selected={selectedAccount}
        disabled={accounts.length === 0}
      />
      {disabled
        ? null
        : openIntent && (
            <animated.div style={style}>
              <Dropdown
                selected={selectedAccount}
                accounts={accounts}
                onClick={(address) => {
                  onSelect(address);
                  setOpen(false);
                }}
              />
            </animated.div>
          )}
    </div>
  );
};
