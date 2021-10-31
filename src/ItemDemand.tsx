import { Avatar } from "./components/avatar";
import { Divider } from "./components/divider";
import { Tabs } from "./components/tabs";
import { useEffect, useState } from "preact/hooks";
import { Skeleton } from "./components/skeleton/skeleton";
import { api, professionMap } from "./utils";
interface costProps {
  rarity: number;
  name: string;
  profession: keyof typeof professionMap;
  elite: number; //精英化
  skill: number; //技能1-7
  mastery: [number, number, number]; //技能专精
}
function Cost({
  rarity,
  name,
  profession,
  elite,
  skill,
  mastery: [mastery1, mastery2, mastery3],
}: costProps) {
  return (
    <div class="flex flex-col justify-center items-center py-8px border-divider border-r-1px border-b-1px border-solid">
      <Avatar rarity={rarity} name={name} profession={profession} size={60} />
      <div class={`${elite === 0 ? "text-disabled" : ""}`}>
        精英化：
        <span class={`${elite !== 0 ? "text-primary-main" : ""} font-bold`}>
          {elite}
        </span>
      </div>
      <div class={`${skill === 0 ? "text-disabled" : ""}`}>
        技能1→7：
        <span class={`${skill !== 0 ? "text-primary-main" : ""}  font-bold`}>
          {skill}
        </span>
      </div>
      <div
        class={`${mastery1 + mastery2 + mastery3 === 0 ? "text-disabled" : ""}`}
      >
        技能专精：
        <span
          class={`${
            mastery1 + mastery2 + mastery3 !== 0 ? "text-primary-main" : ""
          }  font-bold`}
        >
          {mastery1 + mastery2 + mastery3 === 0
            ? 0
            : `${mastery1}/${mastery2}/${mastery3}`}
        </span>
      </div>
    </div>
  );
}
interface cost {
  label: string;
  data: Array<costProps>;
}
interface itemCost {
  costs: Array<cost>;
  total: {
    elite: number;
    skill: number;
    mastery: number;
    total: number;
  };
}
async function query(name: string): Promise<itemCost> {
  const { data } = await api({
    method: "get",
    url: `/widgets/itemDemand/${name}`,
  });
  console.log(data);
  const costs = new Array<cost>(6);
  let total = {
    elite: 0,
    skill: 0,
    mastery: 0,
    total: 0,
  };
  (data as Array<costProps>).forEach((v) => {
    const cost = costs[v.rarity] || { label: `${v.rarity + 1}星`, data: [] };
    cost.data.push(v);
    costs[v.rarity] = cost;
    total.elite += v.elite;
    total.skill += v.skill;
    total.mastery += v.mastery.reduce((acc, cur) => acc + cur, 0);
  });
  total.total = total.elite + total.skill + total.mastery;
  return {
    costs: costs.filter((v) => v),
    total,
  };
}
interface props {
  item: string;
}
export function ItemDemand({ item }: props) {
  const [data, setData] = useState<itemCost>();
  const [fail, setFail] = useState(false);
  const init = async () => {
    try {
      const cost = await query(item);
      console.log(cost);
      setData(cost);
    } catch (err) {
      console.log(err);
      setFail(true);
    }
  };
  useEffect(() => {
    init();
  }, []);
  const [selected, setSelected] = useState(0);
  return (
    <>
      <div class="max-w-700px  p-8px bg-paper box-border">
        {fail ? (
          <div
            class="py-12px px-8px border-primary-main border-1px border-solid w-140px rounded"
            onClick={() => {
              init();
            }}
          >
            加载失败 点击重试
          </div>
        ) : data ? (
          <>
            <div>
              <div>精英化：{data.total.elite}</div>
              <div>技能1→7：{data.total.skill}</div>
              <div>技能专精：{data.total.mastery}</div>
              <div class="font-bold">总计：{data.total.total}</div>
            </div>
            <Tabs
            // class="z-10"
              classes="sticky top-0 bg-paper z-10"
              labels={data.costs.map((v) => v.label)}
              onChange={(i) => {
                setSelected(i);
              }}
              selected={selected}
            ></Tabs>
            <div class="">
              {data.costs.map((cost, i) => (
                <div
                  class={`grid grid-cols-5 <sm:grid-cols-3 border-solid border-l-1px border-divider ${
                    selected == i ? "" : "hidden"
                  }`}
                >
                  {cost.data.map((v) => (
                    <Cost
                      rarity={v.rarity}
                      name={v.name}
                      profession={v.profession}
                      elite={v.elite}
                      skill={v.skill}
                      mastery={v.mastery}
                    />
                  ))}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <Skeleton classes="w-100px h-30px" />
            <Skeleton classes="w-100px h-30px" />
            <Skeleton classes="w-100px h-30px" />
            <Skeleton classes="w-full h-200px" />
          </>
        )}
      </div>
    </>
  );
}
