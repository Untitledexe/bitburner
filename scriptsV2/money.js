export async function main(ns) {
  const host = ns.getHostname();
  const hackTime = (ns.getHackTime(host)+20)
  const growTime = (ns.getGrowTime(host)+20)
  const weakenTime = (ns.getWeakenTime(host)+20)

  while (true) {

    if (ns.getServerSecurityLevel(host) > ns.getServerMinSecurityLevel(host)) {
      const script = "scriptsV2/weaken.js";
      const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
      if (threads > 0){
        await ns.exec(script,host,threads,host);
        await ns.sleep(weakenTime)
      }
    }
  
    else if (ns.getServerMoneyAvailable(host) < ns.getServerMaxMoney(host)) {
      const script = "scriptsV2/grow.js";
      const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
      if (threads > 0){
        await ns.exec(script,host,threads,host);
        await ns.sleep(growTime)
      }
    }
  
    else {
      const script = "scriptsV2/hack.js";
      const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
      if (threads > 0){
        await ns.exec(script,host,threads,host);
        await ns.sleep(hackTime)
      }
    }
    await ns.sleep(1)
  }
}
  
  