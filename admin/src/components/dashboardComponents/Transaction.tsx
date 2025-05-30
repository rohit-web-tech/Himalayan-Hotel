import { CreditCard, IndianRupee, LucideProps, Wallet } from 'lucide-react';
import { FC, useCallback, useEffect, useState } from 'react';

interface IProps {
    type: "add" | "refund";
    method: "paypal" | "wallet" | "credit-card";
    amount: number;
}

const Transaction: FC<IProps> = ({
    type = "add",
    amount = 0,
    method = "paypal"
}) => {

    interface ITransactionAssets {
        title?: string;
        icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        iconColor?: string;
    }

    const [transactionAssets, setTransactionAssets] = useState<ITransactionAssets>({});

    const initialisePaymentAssets = useCallback(() => {
        switch (method) {
            case "paypal":
                setTransactionAssets({
                    title: "Paypal transfer",
                    icon: IndianRupee,
                    iconColor: "bg-blue-600"
                });
                break;
            case "wallet":
                setTransactionAssets({
                    title: "Wallet payment",
                    icon: Wallet,
                    iconColor: "bg-yellow-400"
                });
                break;
            case "credit-card":
                setTransactionAssets({
                    title: "Credit card",
                    icon: CreditCard,
                    iconColor: "bg-pink-400"
                });
                break;
            default:
                setTransactionAssets({
                    title: "Paypal transfer",
                    icon: IndianRupee,
                    iconColor: "bg-blue-600"
                });
        }
    }, [type, method, amount]);

    useEffect(() => {
        initialisePaymentAssets();
    }, [type, method, amount]);

    const IconWrapper = ({
        Icon = IndianRupee
    }) => (
        <Icon
            className="text-white"
        />
    )

    return (
        <div
            className="flex items-center justify-between w-full"
        >
            <div
                className="flex items-center gap-2"
            >
                <div
                    className={`p-2 rounded-lg ${transactionAssets?.iconColor}`}
                >
                    <IconWrapper
                        Icon={transactionAssets?.icon}
                    />
                </div>
                <div
                    className='flex flex-col justify-center items-start'
                >
                    <span
                        className="text-base font-medium text-main-text"
                    >
                        {transactionAssets?.title}
                    </span>
                    <span
                        className="text-sm text-gray"
                    >
                        {type === "add" ? "Money Added" : "Refund"}
                    </span>
                </div>
            </div>
            <div
                className={`text-base font-medium ${type === "add" ? "text-green-600" : "text-red-600"}`}
            >
                {`${type === "add" ? "+" : "-"}₹${amount}`}
            </div>
        </div>
    )
}

export default Transaction;