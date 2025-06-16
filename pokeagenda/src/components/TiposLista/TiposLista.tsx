import React from "react";
import { ReactComponent as DarkIcon } from "../../assets/icons/dark.svg"
import { ReactComponent as DragonIcon } from "../../assets/icons/dragon.svg"
import { ReactComponent as ElectricIcon } from "../../assets/icons/electric.svg"
import { ReactComponent as FairyIcon } from "../../assets/icons/fairy.svg"
import { ReactComponent as FireIcon } from "../../assets/icons/fire.svg"
import { ReactComponent as GhostIcon } from "../../assets/icons/ghost.svg"
import { ReactComponent as GrassIcon } from "../../assets/icons/grass.svg"
import { ReactComponent as GroundIcon } from "../../assets/icons/ground.svg"
import { ReactComponent as IceIcon } from "../../assets/icons/ice.svg"
import { ReactComponent as NormalIcon } from "../../assets/icons/normal.svg"
import { ReactComponent as PoisonIcon } from "../../assets/icons/poison.svg"
import { ReactComponent as WaterIcon } from "../../assets/icons/water.svg"
import "../../assets/icons/style.css";

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    dark: DarkIcon,
    dragon: DragonIcon,
    electric: ElectricIcon,
    fairy: FairyIcon,
    fire: FireIcon,
    ghost: GhostIcon,
    grass: GrassIcon,
    ground: GroundIcon,
    ice: IceIcon,
    normal: NormalIcon,
    poison: PoisonIcon,
    water: WaterIcon
};

interface TiposListaProps {
    tipos: string[];
}

export function TiposLista({ tipos }: Readonly<TiposListaProps>) {
    return (
        <div className="wrapper">
            {tipos.map(tipo => {
                const key = tipo.toLowerCase();
                const Icon = iconMap[key];
                if (!Icon) return null;
                return (
                    <div key={tipo} className={`icon ${tipo}`}>
                        {Icon && <Icon className="icon.img" />}
                    <span
                        style={{
                        display: "block",
                        textAlign: "center",
                        marginTop: "0.5rem",
                        color: "#fff",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                    }}>
                    {tipo}
                    </span>
                    <div>{tipo}</div>
                    </div>
                );
            })}
        </div>
    );
}
